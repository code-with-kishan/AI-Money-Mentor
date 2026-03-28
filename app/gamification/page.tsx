"use client";

import { PageShell } from "@/components/PageShell";
import { GamificationPanel } from "@/components/GamificationPanel";

export default function GamificationPage() {
  return (
    <PageShell 
      title="Achievements & Gamification" 
      subtitle="Track your progress, earn badges, and climb the leaderboard as you master personal finance."
    >
      <GamificationPanel />
    </PageShell>
  );
}
