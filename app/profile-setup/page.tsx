"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { GlassCard } from "@/components/GlassCard";

export default function ProfileSetupPage() {
  const [profile, setProfile] = useState({
    age: "",
    income: "",
    risk: "moderate",
    goals: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("userProfile");
      if (saved) {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProfile(prev => {
          if (JSON.stringify(prev) === JSON.stringify(parsed)) return prev;
          return { ...prev, ...parsed };
        });
      }
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Save to localStorage (demo)
    setTimeout(() => {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      setLoading(false);
      router.push("/dashboard");
    }, 800);
  }

  return (
    <PageShell 
      title="User Profile Center" 
      subtitle="Keep your financial background updated for the most accurate AI guidance."
    >
      <div className="flex items-center justify-center py-10 px-4">
        <GlassCard className="w-full max-w-xl animate-fade-in border-blue-500/20">
          <div className="mb-8 flex items-center gap-4">
             <div className="h-12 w-12 rounded-full bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xl font-bold text-slate-950">
               {profile.age || "P"}
             </div>
             <div>
               <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
               <p className="text-sm text-slate-400">Update your core financial inputs here.</p>
             </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Current Age</label>
                <input
                  type="number"
                  name="age"
                  className="premium-input w-full"
                  placeholder="e.g. 28"
                  value={profile.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Monthly Income (₹)</label>
                <input
                  type="number"
                  name="income"
                  className="premium-input w-full"
                  placeholder="e.g. 120000"
                  value={profile.income}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Risk Appetite</label>
              <select
                name="risk"
                className="premium-input w-full bg-slate-800"
                value={profile.risk}
                onChange={handleChange}
              >
                <option value="low">Low (Capital Protection First)</option>
                <option value="moderate">Moderate (Balanced Growth)</option>
                <option value="high">High (Maximum Alpha Pursuit)</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Primary Financial Goals</label>
              <textarea
                name="goals"
                rows={4}
                className="premium-input w-full"
                placeholder="E.g. Buy a flat in 5 years, Child education, Early retirement at 45."
                value={profile.goals}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="w-full bg-linear-to-r from-blue-500 to-cyan-500 text-slate-950 font-black rounded-2xl py-4 shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Syncing with Agent System..." : "Save Profile & Refresh Analysis"}
            </button>
            {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
          </form>
        </GlassCard>
      </div>
    </PageShell>
  );
}
