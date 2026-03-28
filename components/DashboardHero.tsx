import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "./hooks/useGsapContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const DashboardHero = React.memo(function DashboardHero({ userName }: { userName: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const orbit1Ref = useRef<HTMLDivElement>(null);
  const orbit2Ref = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGsapContext(containerRef, () => {
    const el = containerRef.current;
    if (!el) return;

    gsap.from("[data-dashboard-hero-text]", {
      opacity: 0,
      x: -30,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      lazy: true
    });
    
    gsap.from("[data-dashboard-hero-visual]", {
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      ease: "expo.out",
      delay: 0.3,
      lazy: true
    });

    const allAnims: gsap.core.Tween[] = [];

    if (coinRef.current) {
      allAnims.push(
        gsap.to(coinRef.current, {
          rotation: 360,
          duration: 4,
          repeat: -1,
          ease: "linear",
          paused: true,
        })
      );
    }

    if (orbit1Ref.current) {
      allAnims.push(
        gsap.to(orbit1Ref.current, {
          rotation: 360,
          duration: 10,
          repeat: -1,
          ease: "linear",
          paused: true,
        })
      );
    }

    if (orbit2Ref.current) {
      allAnims.push(
        gsap.to(orbit2Ref.current, {
          rotation: -360,
          duration: 15,
          repeat: -1,
          ease: "linear",
          paused: true,
        })
      );
    }

    if (badgeRef.current) {
      allAnims.push(
        gsap.to(badgeRef.current, {
          y: -8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        })
      );
    }

    if (allAnims.length > 0) {
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => allAnims.forEach(a => a.play()),
        onLeave: () => allAnims.forEach(a => a.pause()),
        onEnterBack: () => allAnims.forEach(a => a.play()),
        onLeaveBack: () => allAnims.forEach(a => a.pause()),
      });
    }
  }, [userName]);

  return (
    <div ref={containerRef} className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-8 sm:p-12 lg:flex lg:items-center lg:justify-between">
      {/* Background Orbs — radial-gradient instead of expensive blur-[80px] */}
      <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)" }} />
      
      <div className="relative z-10 lg:max-w-xl">
        <div data-dashboard-hero-text className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Autonomous Agent active
        </div>
        <h1 data-dashboard-hero-text className="display-font text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-tight">
          Welcome back, <br/>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            {userName || "Investor"}
          </span>
        </h1>
        <p data-dashboard-hero-text className="mt-4 text-lg text-slate-300/80 max-w-md">
          Your AI Money Mentor has analyzed your latest data. Here is your autonomous wealth roadmap.
        </p>
      </div>

      {/* Mini Visual — GSAP-controlled animations with refs for safety */}
      <div data-dashboard-hero-visual className="hidden lg:block relative w-64 h-64">
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Spinning Coin */}
            <div ref={coinRef} className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl shadow-yellow-500/20 flex items-center justify-center text-3xl font-bold text-slate-900">
                ₹
            </div>
            {/* Orbiting Elements */}
            <div ref={orbit1Ref} className="absolute w-40 h-40 border border-blue-500/20 rounded-full" />
            <div ref={orbit2Ref} className="absolute w-48 h-48 border border-cyan-400/10 rounded-full" />
            
            {/* Badge — gentle float */}
            <div ref={badgeRef} className="absolute -top-4 -right-4 bg-slate-800/80 border border-white/10 rounded-lg p-2 shadow-xl">
                <span className="text-xs font-bold text-emerald-400">+12%</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-slate-800/80 border border-white/10 rounded-lg p-2 shadow-xl">
                <span className="text-xs font-bold text-blue-300">Goal: 85%</span>
            </div>
        </div>
      </div>
    </div>
  );
});
