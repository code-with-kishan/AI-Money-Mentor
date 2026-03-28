import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  if (!phone || phone.length !== 10) {
    return NextResponse.json({ success: false, error: "Invalid phone number" });
  }
  
  // Limit resend attempts
  if (otpStore[phone] && otpStore[phone].count >= 3 && Date.now() < otpStore[phone].expires) {
    return NextResponse.json({ success: false, error: "Resend limit reached" });
  }
  
  // Generate OTP (fixed for demo)
  const otp = "123456";
  otpStore[phone] = {
    otp,
    expires: Date.now() + 2 * 60 * 1000, // 2 min
    count: (otpStore[phone]?.count || 0) + 1,
  };
  
  return NextResponse.json({ success: true, otp }); // Demo: return OTP
}
