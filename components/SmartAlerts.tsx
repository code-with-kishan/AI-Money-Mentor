"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { GlassCard } from "@/components/GlassCard";

type Alert = {
  id: string;
  type: "warning" | "info" | "success" | "critical";
  title: string;
  message: string;
  action?: { label: string; href: string };
  icon: string;
};

type FilterType = "all" | "warning" | "critical" | "success";

const SAMPLE_ALERTS: Alert[] = [
  {
    id: "1",
    type: "critical",
    icon: "⚠️",
    title: "Emergency Fund Low",
    message: "Your emergency fund covers only 2 months of expenses. Consider building it to 6 months.",
    action: { label: "View Plan", href: "/goal-planner" },
  },
  {
    id: "2",
    type: "warning",
    icon: "📊",
    title: "Overspending Alert",
    message: "Your spending is 15% higher than last month. Review your expense tracker.",
    action: { label: "Check Expenses", href: "/expense-tracker" },
  },
  {
    id: "3",
    type: "info",
    icon: "💡",
    title: "Tax Saving Opportunity",
    message: "You can save ₹28,000 by choosing the new tax regime. Use the Tax Optimizer.",
    action: { label: "Optimize Now", href: "/tax-optimizer" },
  },
  {
    id: "4",
    type: "success",
    icon: "✅",
    title: "Monthly Goal Complete",
    message: "Congratulations! You've saved ₹25,000 this month. Keep up the momentum!",
  },
  {
    id: "5",
    type: "warning",
    icon: "📉",
    title: "Portfolio Check",
    message: "Your portfolio is 60% equity. Consider rebalancing for better diversification.",
    action: { label: "Analyze Portfolio", href: "/portfolio" },
  },
];

const ALERT_STYLES: Record<Alert["type"], { bg: string; border: string; text: string; accent: string }> = {
  critical: {
    bg: "bg-red-950/20",
    border: "border-red-500/30",
    text: "text-red-200",
    accent: "from-red-500 to-red-700",
  },
  warning: {
    bg: "bg-yellow-950/20",
    border: "border-yellow-500/30",
    text: "text-yellow-200",
    accent: "from-yellow-500 to-yellow-700",
  },
  info: {
    bg: "bg-blue-950/20",
    border: "border-blue-500/30",
    text: "text-blue-200",
    accent: "from-blue-500 to-blue-700",
  },
  success: {
    bg: "bg-emerald-950/20",
    border: "border-emerald-500/30",
    text: "text-emerald-200",
    accent: "from-emerald-500 to-emerald-700",
  },
};

export function SmartAlerts({ externalAlerts }: { externalAlerts?: Alert[] }) {
  const [alerts, setAlerts] = useState<Alert[]>(externalAlerts || SAMPLE_ALERTS);

  useEffect(() => {
    if (externalAlerts) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAlerts(prev => {
        if (JSON.stringify(prev) === JSON.stringify(externalAlerts)) return prev;
        return externalAlerts;
      });
    }
  }, [externalAlerts]);

  const [filter, setFilter] = useState<FilterType>("all");
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const alertsRef = useRef<HTMLDivElement | null>(null);

  const filteredAlerts = alerts.filter(
    (alert) => !dismissedIds.has(alert.id) && (filter === "all" || alert.type === filter)
  );

  const dismissAlert = (id: string) => {
    setDismissedIds(new Set([...dismissedIds, id]));
  };

  useEffect(() => {
    if (!alertsRef.current) return;
    const alertElements = alertsRef.current.querySelectorAll("[data-alert]");
    gsap.fromTo(
      alertElements,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, [filteredAlerts]);

  const alertCounts = {
    critical: alerts.filter((a) => a.type === "critical" && !dismissedIds.has(a.id)).length,
    warning: alerts.filter((a) => a.type === "warning" && !dismissedIds.has(a.id)).length,
    success: alerts.filter((a) => a.type === "success" && !dismissedIds.has(a.id)).length,
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === "all"
              ? "bg-blue-500/20 text-blue-200 border border-blue-500/50"
              : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-slate-600"
          }`}
        >
          All ({filteredAlerts.length})
        </button>

        {["critical", "warning", "success"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as FilterType)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === type
                ? "bg-blue-500/20 text-blue-200 border border-blue-500/50"
                : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-slate-600"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} (
            {Math.max(0, alertCounts[type as keyof typeof alertCounts])})
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div ref={alertsRef} className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <GlassCard>
            <p className="text-center text-sm text-slate-300/60">All caught up! No alerts at this time. 🎉</p>
          </GlassCard>
        ) : (
          filteredAlerts.map((alert) => {
            const style = ALERT_STYLES[alert.type];
            return (
              <div key={alert.id} data-alert className={`rounded-2xl border ${style.bg} ${style.border} p-4`}>
                <div className="flex gap-4">
                  <div className="shrink-0 text-2xl">{alert.icon}</div>

                  <div className="flex-1">
                    <p className={`font-semibold ${style.text}`}>{alert.title}</p>
                    <p className="mt-1 text-sm text-slate-300">{alert.message}</p>

                    {alert.action && (
                      <a
                        href={alert.action.href}
                        className={`mt-3 inline-block rounded-lg px-3 py-1 text-xs font-medium transition ${style.text} hover:opacity-80 border ${style.border}`}
                      >
                        {alert.action.label}
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="shrink-0 text-slate-400 hover:text-slate-200 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function SmartAlertsWidget() {
  const [alertCount] = useState(5);

  return (
    <GlassCard>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">Active Alerts</p>
          <p className="display-font mt-2 text-3xl font-bold text-amber-200">{alertCount}</p>
        </div>
        <a
          href="/alerts"
          className="premium-button rounded-full px-4 py-2 text-sm"
        >
          View All
        </a>
      </div>
    </GlassCard>
  );
}
