"use client";
import { useState, useEffect } from "react";
import { gsap } from "gsap";

export function GuidedDemo({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  
  const steps = [
    { title: "Autonomous Orchestration", desc: "Watch as 4 specialized AI agents collaborate to analyze your data.", target: "[data-dashboard-hero-text]" },
    { title: "Real-Time Simulations", desc: "Change any life event and see your 10-year roadmap update instantly.", target: "[data-simulator-panel]" },
    { title: "Portfolio X-Ray", desc: "Our agent detects overlaps and tax leaks in your stock holdings.", target: "[data-dashboard-card]" },
    { title: "Explainable AI", desc: "Hover over any decision to see the 'Why this decision?' rationale.", target: "[data-impact-projection]" }
  ];

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    gsap.fromTo(".demo-bubble", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out" });
  }, [step]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-md">
      <div className="demo-bubble relative w-full max-w-sm rounded-3xl border border-blue-500/30 bg-slate-900 p-8 shadow-2xl">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 p-3 shadow-lg shadow-blue-500/40">
           <span className="text-2xl font-bold text-white">A</span>
        </div>
        
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-400">Step {step + 1} of {steps.length}</p>
        <h3 className="mt-2 text-2xl font-bold text-white leading-tight">{steps[step].title}</h3>
        <p className="mt-3 text-slate-300/80 leading-relaxed">{steps[step].desc}</p>
        
        <div className="mt-8 flex items-center justify-between">
            <button 
                onClick={onComplete}
                className="text-sm font-medium text-slate-500 hover:text-slate-300 transition"
            >
                Skip
            </button>
            <button 
                onClick={next}
                className="rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:shadow-lg hover:shadow-blue-500/20"
            >
                {step === steps.length - 1 ? "Finish Tour" : "Next Step"}
            </button>
        </div>
      </div>
    </div>
  );
}
