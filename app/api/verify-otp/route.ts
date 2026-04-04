import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ai-money-mentor-secret-key-demo";
const DEMO_OTP_COOKIE = "demo-otp-challenge";

function parseDemoOtpCookie(cookieValue: string | undefined) {
  if (!cookieValue) return null;

  const [cookiePhone, cookieOtp, cookieExpires] = cookieValue.split("|");
  const expires = Number(cookieExpires);

  if (!cookiePhone || !cookieOtp || Number.isNaN(expires)) {
    return null;
  }

  return { phone: cookiePhone, otp: cookieOtp, expires };
}

export async function POST(req: NextRequest) {
  const { phone, otp } = await req.json();
  if (!phone || !otp) {
    return NextResponse.json({ success: false, error: "Missing phone or OTP" });
  }

  const cookieRecord = parseDemoOtpCookie(req.cookies.get(DEMO_OTP_COOKIE)?.value);
  if (cookieRecord) {
    if (cookieRecord.phone !== phone || cookieRecord.otp !== otp) {
      return NextResponse.json({ success: false, error: "Invalid OTP" });
    }
    if (Date.now() > cookieRecord.expires) {
      return NextResponse.json({ success: false, error: "OTP expired" });
    }
  } else {
    // Fallback for local dev if the browser cookie is unavailable.
    const record = otpStore[phone];
    if (!record || record.otp !== otp) {
      return NextResponse.json({ success: false, error: "Invalid OTP" });
    }
    if (Date.now() > record.expires) {
      return NextResponse.json({ success: false, error: "OTP expired" });
    }
  }
  
  // Successful OTP verification
  delete otpStore[phone]; // Clean up
  
  // Create JWT token
  const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: "7d" });
  
  // Create response and set cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: DEMO_OTP_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set({
    name: "auth-token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
  
  return response;
}
