"use client";

import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { GlassCard } from "@/components/GlassCard";
import { PageShell } from "@/components/PageShell";
import { MoneyCounter } from "@/components/MoneyCounter";
import { Skeleton } from "@/components/Skeleton";
import { gsap } from "gsap";
import { useGsapContext } from "@/components/hooks/useGsapContext";

// Dynamic Imports for Charts
const BasePieChart = dynamic(() => import("@/components/charts/BasePieChart").then(mod => mod.BasePieChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[250px] w-full rounded-xl" />,
});

const BaseBarChart = dynamic(() => import("@/components/charts/BaseBarChart").then(mod => mod.BaseBarChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[220px] w-full rounded-xl" />,
});

type Expense = {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
};

const CATEGORIES = ["Food", "Transport", "Entertainment", "Utilities", "Shopping", "Health", "Education", "Other"];

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#f59e0b",
  Transport: "#3b82f6",
  Entertainment: "#ec4899",
  Utilities: "#10b981",
  Shopping: "#f87171",
  Health: "#8b5cf6",
  Education: "#06b6d4",
  Other: "#6b7280",
};

const DEMO_EXPENSES: Expense[] = [
  { id: "1", category: "Food", amount: 2500, description: "Groceries", date: "2024-03-20" },
  { id: "2", category: "Transport", amount: 800, description: "Uber rides", date: "2024-03-19" },
  { id: "3", category: "Entertainment", amount: 1200, description: "Movie & dinner", date: "2024-03-18" },
  { id: "4", category: "Utilities", amount: 3000, description: "Electricity bill", date: "2024-03-17" },
  { id: "5", category: "Shopping", amount: 4500, description: "New shirt", date: "2024-03-16" },
];

const INITIAL_WEEKLY_DATA = [
  { day: "Sun", amount: 1200 },
  { day: "Mon", amount: 1900 },
  { day: "Tue", amount: 800 },
  { day: "Wed", amount: 1500 },
  { day: "Thu", amount: 2100 },
  { day: "Fri", amount: 1700 },
  { day: "Sat", amount: 2400 },
];

const ExpenseList = React.memo(({ expenses }: { expenses: Expense[] }) => (
  <div className="mt-6 space-y-2 border-t border-slate-700 pt-4">
    <p className="text-xs uppercase tracking-widest text-slate-400">Recent</p>
    <div className="max-h-64 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
      {expenses.slice(0, 10).map((exp) => (
        <div key={exp.id} className="flex items-center justify-between rounded-lg bg-slate-900/50 px-3 py-2 border border-white/5">
          <div>
            <p className="text-xs font-semibold text-slate-200">{exp.category}</p>
            <p className="text-[10px] text-slate-500">{exp.description || exp.date}</p>
          </div>
          <p className="text-xs font-bold text-cyan-200">₹{exp.amount.toLocaleString("en-IN")}</p>
        </div>
      ))}
    </div>
  </div>
));
ExpenseList.displayName = "ExpenseList";

const ExpenseTrackerPage = React.memo(function ExpenseTrackerPage() {
  const [expenses, setExpenses] = useState<Expense[]>(DEMO_EXPENSES);
  const [formData, setFormData] = useState({
    category: "Food",
    amount: "",
    description: "",
  });
  const chartsRef = useRef<HTMLDivElement | null>(null);

  const stats = useMemo(() => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const avg = Math.round(total / Math.max(expenses.length, 1));
    
    const breakdown = CATEGORIES.reduce((acc: any[], cat) => {
      const amt = expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
      if (amt > 0) {
        acc.push({ 
          name: cat, 
          value: amt, 
          percentage: parseFloat(((amt / total) * 100).toFixed(1)) 
        });
      }
      return acc;
    }, []).sort((a: any, b: any) => b.value - a.value);

    return { total, avg, breakdown };
  }, [expenses]);

  const handleAddExpense = () => {
    if (!formData.amount || !formData.category) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description || "Expense",
      date: new Date().toISOString().split("T")[0],
    };

    setExpenses([newExpense, ...expenses]);
    setFormData({ category: "Food", amount: "", description: "" });

    if (chartsRef.current) {
      gsap.fromTo(
        chartsRef.current.querySelectorAll("[data-chart]"),
        { opacity: 0.7, y: 5 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05, overwrite: "auto" }
      );
    }
  };

  useGsapContext(chartsRef, () => {
    if (!chartsRef.current) return;
    gsap.fromTo(
      chartsRef.current.querySelectorAll("[data-chart]"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", lazy: true }
    );
  }, []);

  return (
    <PageShell title="Expense Tracker" subtitle="Track daily spending by category and identify saving opportunities.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Input Card */}
        <GlassCard>
          <p className="mb-4 text-xs uppercase tracking-widest text-slate-400">Add Expense</p>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="premium-input text-sm"
              >
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">Amount (INR)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0"
                className="premium-input text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g. Groceries"
                className="premium-input text-sm"
              />
            </div>
            <button onClick={handleAddExpense} className="premium-button w-full py-2 text-sm font-bold">
              Add Expense
            </button>
          </div>
          <ExpenseList expenses={expenses} />
        </GlassCard>

        {/* Charts Section */}
        <div ref={chartsRef} className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <GlassCard data-chart>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Total Spent</p>
              <MoneyCounter value={stats.total} className="display-font mt-2 block text-2xl font-bold text-orange-200" />
            </GlassCard>
            <GlassCard data-chart>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Avg / Item</p>
              <MoneyCounter value={stats.avg} className="display-font mt-2 block text-2xl font-bold text-blue-200" />
            </GlassCard>
          </div>

          <GlassCard data-chart>
            <p className="mb-4 text-[10px] uppercase tracking-widest text-slate-400">Category Mix</p>
            {stats.breakdown.length > 0 ? (
              <BasePieChart data={stats.breakdown} colors={CATEGORY_COLORS} height={250} totalValue={stats.total} />
            ) : (
              <div className="h-[250px] flex items-center justify-center text-slate-500 text-xs italic">No data yet</div>
            )}
          </GlassCard>

          <GlassCard data-chart>
            <p className="mb-4 text-[10px] uppercase tracking-widest text-slate-400">Weekly Activity</p>
            <BaseBarChart 
              data={INITIAL_WEEKLY_DATA} 
              bars={[{ key: "amount", name: "Spends", color: "#5a8cff" }]}
              height={220}
              xAxisKey="day"
            />
          </GlassCard>

          <GlassCard data-chart>
            <p className="mb-4 text-[10px] uppercase tracking-widest text-slate-400">Top Categories</p>
            <div className="grid gap-3">
              {stats.breakdown.slice(0, 4).map((cat: any) => (
                <div key={cat.name} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-300">{cat.name}</span>
                    <span className="text-xs font-bold text-slate-100">₹{cat.value.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: `${cat.percentage}%`, 
                        backgroundColor: CATEGORY_COLORS[cat.name] || "#8884d8" 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
});

export default ExpenseTrackerPage;
