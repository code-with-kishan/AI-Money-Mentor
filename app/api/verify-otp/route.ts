import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ai-money-mentor-secret-key-demo";

export async function POST(req: NextRequest) {
  const { phone, otp } = await req.json();
  if (!phone || !otp) {
    return NextResponse.json({ success: false, error: "Missing phone or OTP" });
  }
  
  // Validate OTP
  const record = otpStore[phone];
  if (!record || record.otp !== otp) {
    return NextResponse.json({ success: false, error: "Invalid OTP" });
  }
  if (Date.now() > record.expires) {
    return NextResponse.json({ success: false, error: "OTP expired" });
  }
  
  // Successful OTP verification
  delete otpStore[phone]; // Clean up
  
  // Create JWT token
  const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: "7d" });
  
  // Create response and set cookie
  const response = NextResponse.json({ success: true });
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
