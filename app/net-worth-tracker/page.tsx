"use client";

import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { GlassCard } from "@/components/GlassCard";
import { PageShell } from "@/components/PageShell";
import { MoneyCounter } from "@/components/MoneyCounter";
import { Skeleton } from "@/components/Skeleton";

// Dynamic Import for AreaChart
const BaseAreaChart = dynamic(() => import("@/components/charts/BaseAreaChart").then(mod => mod.BaseAreaChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[250px] w-full rounded-xl" />,
});

type Asset = {
  id: string;
  name: string;
  type: "savings" | "investments" | "property" | "vehicle" | "other" | "debt";
  value: number;
};

type Liability = {
  id: string;
  name: string;
  type: "loan" | "credit" | "mortgage" | "other";
  amount: number;
  interestRate?: number;
};

const ASSET_ICONS: Record<string, string> = {
  savings: "🏦",
  investments: "📈",
  property: "🏠",
  vehicle: "🚗",
  other: "💎",
  debt: "💸",
};

const LIABILITY_ICONS: Record<string, string> = {
  loan: "💳",
  credit: "💳",
  mortgage: "🏘️",
  other: "📋",
};

const AssetListItem = React.memo(({ asset, onRemove }: { asset: Asset; onRemove: (id: string) => void }) => (
  <div className="flex items-center justify-between rounded-lg bg-slate-900/50 px-3 py-2 border border-white/5 group hover:border-blue-500/30 transition-colors">
    <div>
      <p className="text-xs font-medium text-slate-200">
        <span className="mr-2 opacity-80">{ASSET_ICONS[asset.type] || "💰"}</span> 
        {asset.name}
      </p>
      <p className="text-[10px] text-slate-400 mt-0.5">₹{asset.value.toLocaleString("en-IN")}</p>
    </div>
    <button
      onClick={() => onRemove(asset.id)}
      className="text-xs text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all px-2"
    >
      ✕
    </button>
  </div>
));
AssetListItem.displayName = "AssetListItem";

const LiabilityListItem = React.memo(({ liability, onRemove }: { liability: Liability; onRemove: (id: string) => void }) => (
  <div className="flex items-center justify-between rounded-lg bg-slate-900/50 px-3 py-2 border border-white/5 group hover:border-rose-500/30 transition-colors">
    <div>
      <p className="text-xs font-medium text-slate-200">
        <span className="mr-2 opacity-80">{LIABILITY_ICONS[liability.type] || "📋"}</span> 
        {liability.name}
      </p>
      <p className="text-[10px] text-slate-400 mt-0.5">
        ₹{liability.amount.toLocaleString("en-IN")}
        {liability.interestRate ? ` @ ${liability.interestRate}%` : ""}
      </p>
    </div>
    <button
      onClick={() => onRemove(liability.id)}
      className="text-xs text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all px-2"
    >
      ✕
    </button>
  </div>
));
LiabilityListItem.displayName = "LiabilityListItem";

const NetWorthTrackerPage = React.memo(function NetWorthTrackerPage() {
  const [assets, setAssets] = useState<Asset[]>([
    { id: "1", name: "Savings Account", type: "savings", value: 500000 },
    { id: "2", name: "Nifty ETF", type: "investments", value: 250000 },
    { id: "3", name: "Apartment", type: "property", value: 5000000 },
    { id: "4", name: "Car", type: "vehicle", value: 800000 },
  ]);

  const [liabilities, setLiabilities] = useState<Liability[]>([
    { id: "1", name: "Car Loan", type: "loan", amount: 300000, interestRate: 8.5 },
    { id: "2", name: "Credit Card", type: "credit", amount: 25000, interestRate: 12 },
  ]);

  const [assetForm, setAssetForm] = useState<{ name: string; type: Asset["type"]; value: string }>({ name: "", type: "savings", value: "" });
  const [liabilityForm, setLiabilityForm] = useState<{ name: string; type: Liability["type"]; amount: string; interestRate: string }>({ name: "", type: "loan", amount: "", interestRate: "" });

  const totals = useMemo(() => {
    const totalA = assets.reduce((sum, a) => sum + a.value, 0);
    const totalL = liabilities.reduce((sum, l) => sum + l.amount, 0);
    return { assets: totalA, liabilities: totalL, net: totalA - totalL };
  }, [assets, liabilities]);

  const historicalData = [
    { month: "Jan", value: 5200000 },
    { month: "Feb", value: 5450000 },
    { month: "Mar", value: 5820000 },
    { month: "Apr", value: 5950000 },
    { month: "May", value: 6080000 },
    { month: "Jun", value: 6225000 },
  ];

  const netWorthGrowthRate = (((historicalData[historicalData.length - 1].value - historicalData[0].value) / historicalData[0].value) * 100).toFixed(1);

  const addAsset = () => {
    if (!assetForm.name || !assetForm.value) return;
    const newAsset: Asset = {
      id: Date.now().toString(),
      name: assetForm.name,
      type: assetForm.type,
      value: parseFloat(assetForm.value),
    };
    setAssets(prev => [...prev, newAsset]);
    setAssetForm({ name: "", type: "savings", value: "" });
  };

  const addLiability = () => {
    if (!liabilityForm.name || !liabilityForm.amount) return;
    const newLiability: Liability = {
      id: Date.now().toString(),
      name: liabilityForm.name,
      type: liabilityForm.type,
      amount: parseFloat(liabilityForm.amount),
      interestRate: liabilityForm.interestRate ? parseFloat(liabilityForm.interestRate) : undefined,
    };
    setLiabilities(prev => [...prev, newLiability]);
    setLiabilityForm({ name: "", type: "loan", amount: "", interestRate: "" });
  };

  const removeAsset = React.useCallback((id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  }, []);

  const removeLiability = React.useCallback((id: string) => {
    setLiabilities(prev => prev.filter(l => l.id !== id));
  }, []);

  return (
    <PageShell title="Net Worth Tracker" subtitle="Calculate and monitor your total net worth, assets, and liabilities over time.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Input Forms */}
        <GlassCard>
          <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Add Asset</p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Asset name (e.g. House)"
              value={assetForm.name}
              onChange={(e) => setAssetForm({ ...assetForm, name: e.target.value })}
              className="premium-input text-xs"
            />
            <select
              value={assetForm.type}
              onChange={(e) => setAssetForm({ ...assetForm, type: e.target.value as Asset["type"] })}
              className="premium-input text-xs"
            >
              <option value="savings">💰 Savings</option>
              <option value="investments">📈 Investments</option>
              <option value="property">🏠 Property</option>
              <option value="vehicle">🚗 Vehicle</option>
              <option value="other">💎 Other</option>
            </select>
            <input
              type="number"
              placeholder="Value (INR)"
              value={assetForm.value}
              onChange={(e) => setAssetForm({ ...assetForm, value: e.target.value })}
              className="premium-input text-xs"
            />
            <button onClick={addAsset} className="premium-button w-full py-2 text-xs font-bold">
              Add Asset
            </button>
          </div>

          <div className="mt-8 space-y-3 border-t border-slate-700/50 pt-5">
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Add Liability</p>
            <input
              type="text"
              placeholder="Liability name"
              value={liabilityForm.name}
              onChange={(e) => setLiabilityForm({ ...liabilityForm, name: e.target.value })}
              className="premium-input text-xs"
            />
            <select
              value={liabilityForm.type}
              onChange={(e) => setLiabilityForm({ ...liabilityForm, type: e.target.value as Liability["type"] })}
              className="premium-input text-xs"
            >
              <option value="loan">💳 Loan</option>
              <option value="credit">💳 Credit Card</option>
              <option value="mortgage">🏘️ Mortgage</option>
              <option value="other">📋 Other</option>
            </select>
            <input
              type="number"
              placeholder="Amount (INR)"
              value={liabilityForm.amount}
              onChange={(e) => setLiabilityForm({ ...liabilityForm, amount: e.target.value })}
              className="premium-input text-xs"
            />
            <button onClick={addLiability} className="premium-button w-full py-2 text-xs font-bold">
              Add Liability
            </button>
          </div>
        </GlassCard>

        {/* Dashboard Sections */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Assets", val: totals.assets, color: "text-emerald-300" },
              { label: "Liabilities", val: totals.liabilities, color: "text-rose-300" },
              { label: "Net Worth", val: totals.net, color: "text-blue-300" }
            ].map(m => (
              <GlassCard key={m.label}>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">{m.label}</p>
                <MoneyCounter value={m.val} className={`display-font block text-lg font-bold ${m.color}`} />
              </GlassCard>
            ))}
          </div>

          <GlassCard>
            <p className="mb-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Wealth Momentum ({netWorthGrowthRate}% Growth)
            </p>
            <BaseAreaChart 
              data={historicalData} 
              dataKey="value" 
              xAxisKey="month" 
              height={220}
              gradientColor="#3b82f6" 
              strokeColor="#60a5fa"
            />
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard>
              <p className="mb-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Asset Breakdown</p>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {assets.length > 0 ? (
                  assets.map(asset => (
                    <AssetListItem key={asset.id} asset={asset} onRemove={removeAsset} />
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic text-center py-4">No assets recorded</p>
                )}
              </div>
            </GlassCard>

            <GlassCard>
              <p className="mb-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Liability Details</p>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {liabilities.length > 0 ? (
                  liabilities.map(liability => (
                    <LiabilityListItem key={liability.id} liability={liability} onRemove={removeLiability} />
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic text-center py-4">No liabilities recorded</p>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </PageShell>
  );
});

export default NetWorthTrackerPage;
