import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { GlassCard } from "@/components/GlassCard";
import { useGsapContext } from "./hooks/useGsapContext";

type Badge = {
  id: string;
  icon: string;
  title: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
};

type UserLevel = {
  level: number;
  title: string;
  xp: number;
  nextLevelXp: number;
  progress: number;
};

export const GamificationPanel = React.memo(function GamificationPanel() {
  const [badges] = useState<Badge[]>([
    {
      id: "first-sip",
      icon: "🎯",
      title: "SIP Starter",
      description: "Create your first SIP plan",
      earned: true,
      earnedDate: "2024-03-15",
    },
    {
      id: "thousand-saved",
      icon: "💰",
      title: "Saver",
      description: "Save ₹1,00,000+",
      earned: true,
      earnedDate: "2024-03-18",
    },
    {
      id: "tax-master",
      icon: "📊",
      title: "Tax Master",
      description: "Use tax optimizer 5 times",
      earned: false,
    },
    {
      id: "portfolio-pro",
      icon: "📈",
      title: "Portfolio Pro",
      description: "Analyze 10 portfolios",
      earned: false,
    },
    {
      id: "chat-expert",
      icon: "💬",
      title: "Chat Expert",
      description: "Ask 50 AI questions",
      earned: false,
    },
    {
      id: "goal-crusher",
      icon: "🚀",
      title: "Goal Crusher",
      description: "Achieve 3 financial goals",
      earned: false,
    },
  ]);

  const [userLevel] = useState<UserLevel>({
    level: 5,
    title: "Investor",
    xp: 2450,
    nextLevelXp: 5000,
    progress: (2450 / 5000) * 100,
  });

  const badgesRef = useRef<HTMLDivElement | null>(null);

  useGsapContext(badgesRef, () => {
    if (!badgesRef.current) return;
    const badgeElements = Array.from(badgesRef.current.querySelectorAll("[data-badge]"));
    gsap.fromTo(
      badgeElements,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out",
        lazy: true,
        overwrite: "auto"
      }
    );
  }, []);

  const earnedBadges = badges.filter((b) => b.earned).length;
  const totalBadges = badges.length;

  return (
    <div className="space-y-5">
      {/* User Level */}
      <GlassCard>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Your Level</p>
            <p className="display-font mt-2 text-4xl font-bold text-blue-200">{userLevel.level}</p>
            <p className="mt-1 text-sm text-slate-300">{userLevel.title}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">XP to next level</p>
            <p className="text-2xl font-bold text-cyan-200">
              {userLevel.nextLevelXp - userLevel.xp}
            </p>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-linear-to-r from-blue-400 to-cyan-300 transition-all duration-500"
              style={{ width: `${userLevel.progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">
            {userLevel.xp} / {userLevel.nextLevelXp} XP
          </p>
        </div>
      </GlassCard>

      {/* Badges Section */}
      <GlassCard>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Achievements: {earnedBadges}/{totalBadges}
          </p>
          <div className="text-2xl">🏆</div>
        </div>

        <div ref={badgesRef} className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge) => (
            <div
              key={badge.id}
              data-badge
              className={`group relative overflow-hidden rounded-xl border transition ${
                badge.earned
                  ? "border-yellow-300/40 bg-linear-to-br from-yellow-900/20 to-slate-900/50"
                  : "border-slate-700/50 bg-slate-900/30 opacity-60"
              }`}
            >
              <div className="flex flex-col items-center gap-2 p-3 text-center">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{badge.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{badge.description}</p>
                </div>

                {badge.earned && badge.earnedDate && (
                  <p className="text-xs text-yellow-300/70">✓ {badge.earnedDate}</p>
                )}

                {!badge.earned && (
                  <p className="mt-1 text-xs text-slate-500">Locked</p>
                )}
              </div>

              {badge.earned && (
                <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-yellow-400/80 flex items-center justify-center text-sm font-bold text-slate-950">
                  ★
                </div>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <GlassCard>
          <p className="text-xs text-slate-400">Streak Days</p>
          <p className="mt-2 text-3xl font-bold text-orange-300">12</p>
          <p className="text-xs text-slate-500 mt-1">🔥 Keep it up!</p>
        </GlassCard>

        <GlassCard>
          <p className="text-xs text-slate-400">Total XP</p>
          <p className="mt-2 text-3xl font-bold text-blue-300">2.4K</p>
          <p className="text-xs text-slate-500 mt-1">⚡ Well done</p>
        </GlassCard>

        <GlassCard>
          <p className="text-xs text-slate-400">Rank</p>
          <p className="mt-2 text-3xl font-bold text-purple-300">187</p>
          <p className="text-xs text-slate-500 mt-1">📊 Top 5%</p>
        </GlassCard>
      </div>
    </div>
  );
});
