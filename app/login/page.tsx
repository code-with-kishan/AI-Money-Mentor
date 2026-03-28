"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [demoOtp, setDemoOtp] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const router = useRouter();

  // Timer for OTP expiry
  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  async function sendOtp() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("otp");
        setDemoOtp(data.otp); // Demo mode: show OTP
        setTimer(120);
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify({ name, email, phone }));
        // Clear stale demo data so dashboard shows the fresh user's name
        localStorage.removeItem("amm-demo");
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid OTP");
      }
    } finally {
      setLoading(false);
    }
  }

  function resendOtp() {
    if (resendCount >= 3) {
      setError("Resend limit reached");
      return;
    }
    setResendCount(resendCount + 1);
    sendOtp();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Subtle Background Glow — radial-gradient instead of expensive blur-[120px] */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />
      
      <div className="glass border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 w-full max-w-md animate-fade-in bg-slate-900/50 backdrop-blur-xl">
        <div className="flex justify-center mb-6">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-cyan-300 text-xl font-bold text-slate-950 shadow-lg shadow-blue-500/20">
            A
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-2 text-center text-slate-100 tracking-tight">Welcome to Portal</h2>
        <p className="text-slate-400 text-center mb-8 text-sm">Enter your details and mobile number to authenticate.</p>

        {step === "phone" && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-300">Full Name</label>
              <input
                type="text"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-300">Email Address</label>
              <input
                type="email"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="name@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-300">Mobile Number (For OTP)</label>
              <input
                type="tel"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                maxLength={10}
                disabled={loading}
              />
            </div>
            
            <button
              className="w-full bg-linear-to-r from-blue-500 to-cyan-500 text-slate-950 font-bold rounded-xl px-4 py-3 mt-4 hover:shadow-lg hover:shadow-blue-500/25 transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={sendOtp}
              disabled={loading || phone.length !== 10 || !name || !email || !password}
            >
              {loading ? "Processing..." : "Continue with OTP"}
            </button>
            {error && <p className="text-red-400 text-sm mt-2 text-center animate-pulse">{error}</p>}
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">We&apos;ve sent a 6-digit code to<br/><span className="text-slate-100 font-semibold tracking-wide">+91 {phone}</span></p>
            </div>
            
            <label className="block mb-1.5 text-sm font-medium text-slate-300 text-center">Security Code</label>
            <input
              type="text"
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 tracking-[0.75em] text-2xl text-center font-mono font-medium transition-all"
              placeholder="000000"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
              disabled={loading}
            />
            
            <button
              className="w-full bg-linear-to-r from-blue-500 to-cyan-500 text-slate-950 font-bold rounded-xl px-4 py-3 mt-4 hover:shadow-lg hover:shadow-blue-500/25 transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={verifyOtp}
              disabled={loading || otp.length !== 6 || timer === 0}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
            
            <div className="flex justify-between items-center mt-4 px-2">
              <button
                className="text-blue-400 text-sm hover:text-blue-300 font-medium transition-colors disabled:opacity-50 disabled:hover:text-blue-400 outline-none focus:text-cyan-300"
                onClick={resendOtp}
                disabled={loading || timer === 0 || resendCount >= 3}
              >
                Resend Code {resendCount < 3 && `(${3 - resendCount})`}
              </button>
              <span className="text-sm font-mono font-semibold text-slate-400">
                {timer > 0 ? `0${Math.floor(timer/60)}:${(timer%60).toString().padStart(2, '0')}` : "Expired"}
              </span>
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-xs text-slate-300 text-center flex flex-col gap-1.5 backdrop-blur-sm">
              <span className="text-slate-400 font-medium tracking-wide uppercase text-[10px]">Demo Mode Active</span>
              <span className="font-mono text-cyan-400 font-bold text-lg tracking-[0.2em]">{demoOtp}</span>
            </div>
            
            {error && <p className="text-red-400 text-sm mt-3 font-medium text-center">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
