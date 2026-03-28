"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "./hooks/useGsapContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CoinConfig {
  symbol: string;
  label: string;
  from: string;
  via: string;
  to: string;
  delay: number;
}

const COINS: CoinConfig[] = [
  { symbol: "₹", label: "INR",  from: "#f6d365", via: "#fda085", to: "#f093fb", delay: 0 },
  { symbol: "📈", label: "SIP", from: "#43e97b", via: "#38f9d7", to: "#43e97b", delay: 0.12 },
  { symbol: "🏆", label: "GOAL",from: "#a18cd1", via: "#fbc2eb", to: "#a18cd1", delay: 0.24 },
  { symbol: "💡", label: "AI",  from: "#4facfe", via: "#00f2fe", to: "#4facfe", delay: 0.36 },
  { symbol: "🛡️", label: "TAX",  from: "#f83600", via: "#f9d423", to: "#f83600", delay: 0.48 },
];

const SingleCoin = React.memo(function SingleCoin({ coin, index }: { coin: CoinConfig; index: number }) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const coinRef  = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGsapContext(wrapRef, (ctx) => {
    const wrap = wrapRef.current;
    const c    = coinRef.current;
    const g    = glowRef.current;
    if (!wrap || !c || !g) return;

    // ── ScrollTrigger entrance ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      delay: coin.delay,
    });

    tl.fromTo(wrap,
      { opacity: 0, y: 60, scale: 0.6, rotationY: 120 },
      { opacity: 1, y: 0,  scale: 1,   rotationY: 0, duration: 1.05, ease: "expo.out", lazy: true, overwrite: "auto" }
    );

    tl.fromTo(g,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, lazy: true, overwrite: "auto" },
      "-=0.6"
    );

    // ── Idle 3D spin (Paused off-screen) ──
    const spin = gsap.to(c, {
      rotationY: 360,
      duration: 5 + index * 0.6,
      repeat: -1,
      ease: "linear",
      paused: true,
    });

    // ── Ring pulse (Paused off-screen) ──
    const activeRings = ringsRef.current.filter((r): r is HTMLDivElement => !!r);
    const ringAnims = activeRings.map((r, i) => 
      gsap.to(r, {
        scale: 1.55 + i * 0.15,
        opacity: 0,
        duration: 1.8 + i * 0.35,
        repeat: -1,
        ease: "power1.out",
        delay: i * 0.55,
        paused: true,
      })
    );

    ScrollTrigger.create({
      trigger: wrap,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => { spin.play(); ringAnims.forEach(r => r.play()); },
      onLeave: () => { spin.pause(); ringAnims.forEach(r => r.pause()); },
      onEnterBack: () => { spin.play(); ringAnims.forEach(r => r.play()); },
      onLeaveBack: () => { spin.pause(); ringAnims.forEach(r => r.pause()); },
    });

    // ── Mouse tilt (optimized to prevent layout thrashing) ──
    let isMoving = false;
    let cachedRect: DOMRect | null = null;

    const onMove = (e: MouseEvent) => {
      if (isMoving) return;
      isMoving = true;
      requestAnimationFrame(() => {
        if (!cachedRect) cachedRect = wrap.getBoundingClientRect();
        const nx = ((e.clientX - cachedRect.left) / cachedRect.width  - 0.5) * 28;
        const ny = ((e.clientY - cachedRect.top)  / cachedRect.height - 0.5) * 28;
        gsap.to(c, { rotationX: -ny, rotationY: nx, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        gsap.to(g, { x: nx * 0.6, y: ny * 0.6, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        isMoving = false;
      });
    };

    const onLeave = () => {
      cachedRect = null; // Clear cache on leave
      gsap.to(c, { rotationX: 0, duration: 0.8, ease: "elastic.out(1,0.5)", overwrite: "auto" });
      gsap.to(g, { x: 0, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    };

    wrap.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [coin.delay, index]);

  return (
    <div
      ref={wrapRef}
      className="relative flex flex-col items-center gap-4 cursor-pointer"
      style={{ perspective: "900px" }}
    >
      <div 
        ref={glowRef} 
        className="relative" 
        style={{ 
          transformStyle: "preserve-3d",
          boxShadow: "0 0 40px rgba(75,213,255,0.7), 0 0 90px rgba(90,140,255,0.35)",
          borderRadius: "100%" 
        }} 
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => { ringsRef.current[i] = el; }}
            className="absolute inset-0 rounded-full border border-blue-400/30"
            style={{ transform: "scale(1)" }}
          />
        ))}

        <div
          ref={coinRef}
          className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center select-none"
          style={{
            background: `linear-gradient(135deg, ${coin.from}, ${coin.via}, ${coin.to})`,
            boxShadow: `inset -4px -4px 12px rgba(0,0,0,0.25), inset 4px 4px 12px rgba(255,255,255,0.25), 0 8px 24px rgba(0,0,0,0.35)`,
            transformStyle: "preserve-3d",
          }}
        >
          <span className="text-3xl sm:text-4xl drop-shadow-lg">{coin.symbol}</span>
          <span className="text-xs font-bold tracking-widest text-white/80 mt-1">{coin.label}</span>
          <div className="absolute top-3 left-6 w-10 h-10 rounded-full bg-white/30 blur-md pointer-events-none" />
        </div>
      </div>
    </div>
  );
});

export const AnimatedCoinsSection = React.memo(function AnimatedCoinsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGsapContext(sectionRef, () => {
    gsap.fromTo("[data-coins-title]",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        overwrite: "auto",
        scrollTrigger: { trigger: "[data-coins-title]", start: "top 85%" },
      }
    );

    gsap.fromTo("[data-coins-sub]",
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.15,
        overwrite: "auto",
        scrollTrigger: { trigger: "[data-coins-title]", start: "top 85%" },
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className="w-full py-28 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-18">
          <p data-coins-title className="text-xs uppercase tracking-[0.3em] text-blue-400/70 mb-3 font-semibold">
            Wealth Made Visual
          </p>
          <h2
            data-coins-title
            className="display-font text-4xl sm:text-5xl font-extrabold text-slate-100 mb-4"
          >
            Your Money,{" "}
            <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Working Hard
            </span>
          </h2>
          <p data-coins-sub className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Every rupee has a mission. From SIPs to tax savings to goal planning —
            AI Money Mentor keeps your wealth momentum alive.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
          {COINS.map((coin, i) => (
            <SingleCoin key={coin.label} coin={coin} index={i} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <a
            href="/dashboard"
            className="premium-button inline-block rounded-full px-10 py-4 text-base font-bold
                       shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
          >
            Start Growing Wealth →
          </a>
        </div>
      </div>
    </div>
  );
});
