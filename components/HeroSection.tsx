"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGsapContext } from "./hooks/useGsapContext";

if (typeof window !== "undefined") {
  gsap.defaults({ lazy: true, overwrite: "auto" });
}

/** Rotating action words */
const CYCLES = ["Invest Smarter.", "Save Strategically.", "Beat Inflation.", "Build Wealth.", "Retire Early."];

export const HeroSection = React.memo(function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cycleRef   = useRef<HTMLSpanElement>(null);
  const nextRef    = useRef<HTMLSpanElement>(null);

  useGsapContext(sectionRef, (ctx) => {
    const el = sectionRef.current;
    if (!el) return;

    // Fast entrance — no delay
    gsap.from("[data-hero-badge]", { opacity: 0, y: 10, duration: 0.4, ease: "power2.out" });
    gsap.from("[data-hero-line]",  { opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.1 });
    gsap.from("[data-hero-sub]",   { opacity: 0, y: 12, duration: 0.4, ease: "power2.out", delay: 0.2 });
    gsap.from("[data-hero-cta]",   { opacity: 0, y: 10, scale: 0.96, duration: 0.35, stagger: 0.06, ease: "back.out(1.5)", delay: 0.25 });
    gsap.from("[data-hero-stat]",  { opacity: 0, y: 14, duration: 0.3, stagger: 0.04, ease: "power2.out", delay: 0.3 });

    // Word cycling
    let idx = 0;
    const cycleEl = cycleRef.current;
    const nextEl  = nextRef.current;

    if (cycleEl && nextEl) {
      const cycle = () => {
        const nextIdx = (idx + 1) % CYCLES.length;
        nextEl.textContent = CYCLES[nextIdx];
        gsap.set(nextEl, { y: "100%", opacity: 0 });

        const tl = gsap.timeline({
          onComplete: () => {
            cycleEl.textContent = CYCLES[nextIdx];
            gsap.set(cycleEl, { y: 0, opacity: 1 });
            gsap.set(nextEl, { opacity: 0 });
            idx = nextIdx;
          }
        });
        tl.to(cycleEl, { y: "-100%", opacity: 0, duration: 0.6, ease: "power3.inOut" });
        tl.to(nextEl, { y: "0%", opacity: 1, duration: 0.6, ease: "power3.inOut" }, "<");
      };

      const id = setInterval(cycle, 3500);
      ctx.add(() => clearInterval(id));
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-3xl border border-white/10
                 bg-gradient-to-br from-slate-900/70 via-slate-950/80 to-slate-900/70
                 px-8 py-16 sm:px-14 sm:py-20"
    >
      {/* Static background orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)" }} />
      <div className="absolute top-0 -right-28 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)" }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div data-hero-badge className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            India-First AI Finance Intelligence
          </div>

          <h1 className="display-font mb-6 overflow-hidden text-5xl font-extrabold leading-[1.08] sm:text-6xl">
            <span data-hero-line className="block neon-text">Plan Better.</span>
            <span data-hero-line className="block">
              <span className="relative inline-grid h-[1.3em] overflow-hidden align-bottom">
                <span ref={cycleRef} className="col-start-1 row-start-1 whitespace-nowrap bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent py-1">{CYCLES[0]}</span>
                <span ref={nextRef} className="col-start-1 row-start-1 whitespace-nowrap opacity-0 translate-y-full bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent py-1">{CYCLES[1]}</span>
              </span>
            </span>
            <span data-hero-line className="block text-slate-100">Grow Faster.</span>
          </h1>

          <p data-hero-sub className="mb-10 max-w-lg text-base leading-relaxed text-slate-300/80 sm:text-lg">
            AI Money Mentor analyses your savings, tax profile, goals, and portfolio
            to deliver personalised action plans built for Indian financial realities.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/dashboard" data-hero-cta className="premium-button rounded-full px-7 py-3.5 text-sm font-bold shadow-lg shadow-blue-500/25">
              Open Dashboard →
            </Link>
            <Link href="/chat" data-hero-cta className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-slate-100 hover:border-blue-300/40 hover:bg-white/10 transition-all">
              Ask AI Mentor
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-xs">
            {[
              { value: "16+",  label: "Features" },
              { value: "₹0",   label: "Setup Cost" },
              { value: "100%", label: "AI Powered" },
            ].map(s => (
              <div key={s.label} data-hero-stat className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <div className="text-xl font-extrabold text-blue-300">{s.value}</div>
                <div className="text-[11px] mt-0.5 text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Static dashboard cards — entrance only */}
        <HeroVisual />
      </div>
    </section>
  );
});

const HeroVisual = React.memo(function HeroVisual() {
  const vizRef = useRef<HTMLDivElement>(null);

  useGsapContext(vizRef, () => {
    gsap.from("[data-card]", { opacity: 0, y: 30, scale: 0.9, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 });
  }, []);

  const chartHeights = [40, 65, 52, 78, 60, 88, 72, 95, 80, 70];

  return (
    <div ref={vizRef} className="hidden lg:flex items-center justify-center relative w-full h-full min-h-[480px]">
      <div data-card className="absolute top-8 left-1/2 -translate-x-1/2 w-72 rounded-2xl border border-white/15 bg-slate-900/80 p-5 shadow-2xl shadow-blue-500/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-slate-400">Portfolio Value</p>
            <p className="text-2xl font-extrabold text-white">₹34,28,000</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-emerald-400 font-semibold">+12.4%</span>
          </div>
        </div>
        <div className="flex items-end gap-1 h-20">
          {chartHeights.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: `linear-gradient(to top, ${i > 6 ? "#4bd5ff" : "#5a8cff"}, ${i > 6 ? "#24c784" : "#4bd5ff"})`, opacity: 0.85 }} />
          ))}
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] text-slate-500">
          {["Jan","Mar","May","Jul","Sep","Nov"].map(m => <span key={m}>{m}</span>)}
        </div>
      </div>

      <div data-card className="absolute top-4 right-0 w-44 rounded-xl border border-white/10 bg-slate-800/90 p-4 shadow-lg">
        <p className="text-[11px] text-slate-400 mb-2">Monthly SIP</p>
        <p className="text-lg font-bold text-cyan-300">₹15,000</p>
        <div className="mt-2 h-1.5 rounded-full bg-slate-700 overflow-hidden">
          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        </div>
        <p className="text-[10px] text-slate-500 mt-1">68% of goal</p>
      </div>

      <div data-card className="absolute bottom-16 left-0 w-40 rounded-xl border border-white/10 bg-slate-800/90 p-4 shadow-lg">
        <p className="text-[11px] text-slate-400 mb-1">Tax Saved</p>
        <p className="text-xl font-bold text-emerald-400">₹64,000</p>
        <p className="text-[10px] text-slate-500 mt-1">This FY · 80C + 80D</p>
      </div>

      <div data-card className="absolute bottom-4 right-6 w-36 rounded-xl border border-blue-500/25 bg-blue-500/10 p-3 text-center shadow-lg">
        <p className="text-[11px] text-blue-300 mb-1">Money Health</p>
        <p className="text-3xl font-black text-white">82</p>
        <p className="text-[10px] text-blue-400">🏆 Excellent</p>
      </div>

      <div className="absolute top-1/2 right-2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black text-slate-900 shadow-lg shadow-yellow-400/30"
        style={{ background: "linear-gradient(135deg, #ffd700, #f9a825, #ffd700)", boxShadow: "inset -3px -3px 8px rgba(0,0,0,0.2), inset 3px 3px 8px rgba(255,255,255,0.3), 0 6px 20px rgba(255,200,0,0.35)" }}>
        ₹
      </div>
    </div>
  );
});
