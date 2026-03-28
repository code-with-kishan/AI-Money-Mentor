"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GlassCard } from "@/components/GlassCard";
import { MoneyCounter } from "@/components/MoneyCounter";
import { Skeleton } from "@/components/Skeleton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "./hooks/useGsapContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WealthChart = dynamic(() => import("./WealthChart"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-xl" />,
});

export const StoryChartSection = React.memo(function StoryChartSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGsapContext(sectionRef, () => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-story-card]");
    if (cards.length === 0) return;
    gsap.fromTo(
      Array.from(cards),
      { opacity: 0, y: 32, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7,
        stagger: 0.1, ease: "power3.out", lazy: true,
        overwrite: "auto",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="grid grid-cols-1 gap-5 lg:grid-cols-5">
      <GlassCard className="lg:col-span-3" >
        <div data-story-card>
          <h3 className="display-font text-xl font-semibold text-slate-100">6-Month Wealth Momentum</h3>
          <p className="mt-2 text-sm text-(--text-muted)">Graph draw + scroll reveal powered by GSAP and Recharts.</p>
          <div className="mt-5 h-64 w-full">
            {!mounted ? (
              <Skeleton className="h-full w-full rounded-xl" />
            ) : (
              <WealthChart />
            )}
          </div>
        </div>
      </GlassCard>

      <div className="flex flex-col gap-5 lg:col-span-2">
        <GlassCard>
          <div data-story-card>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-300/80">Projected Corpus</p>
            <MoneyCounter value={3400000} className="display-font mt-2 block text-3xl font-semibold text-cyan-200" />
          </div>
        </GlassCard>
        <GlassCard>
          <div data-story-card>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-300/80">Potential Tax Savings</p>
            <MoneyCounter value={64000} className="display-font mt-2 block text-3xl font-semibold text-emerald-200" />
          </div>
        </GlassCard>
      </div>
    </section>
  );
});
