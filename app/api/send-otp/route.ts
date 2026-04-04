import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "crypto";

const DEMO_OTP_COOKIE = "demo-otp-challenge";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  if (!phone || phone.length !== 10) {
    return NextResponse.json({ success: false, error: "Invalid phone number" });
  }

  // Generate a fresh 6-digit demo OTP on every request.
  const otp = String(randomInt(100000, 1000000));
  const expires = Date.now() + 2 * 60 * 1000;

  const response = NextResponse.json({ success: true, otp }); // Demo: return OTP
  response.cookies.set({
    name: DEMO_OTP_COOKIE,
    value: `${phone}|${otp}|${expires}`,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 2 * 60,
  });

  return response;
}
