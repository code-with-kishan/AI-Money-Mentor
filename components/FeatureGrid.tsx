import { GlassCard } from "@/components/GlassCard";

const features = [
  {
    title: "Money Health Score",
    description: "Realtime score from salary, expenses, savings, and investment behavior.",
  },
  {
    title: "Goal + SIP Planning",
    description: "Goal-first SIP calculations with realistic annual return assumptions.",
  },
  {
    title: "India Tax Optimization",
    description: "Compare old vs new regime and identify annual tax-saving opportunities.",
  },
  {
    title: "AI Recommendation Engine",
    description: "LangChain-powered agents produce structured, action-oriented guidance.",
  },
];

export function FeatureGrid() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {features.map((item) => (
        <GlassCard key={item.title} className="group">
          <div className="mb-3 h-1 w-14 rounded-full bg-linear-to-r from-blue-400 to-cyan-300 transition group-hover:w-20" />
          <h3 className="display-font text-lg font-semibold text-slate-100">{item.title}</h3>
          <p className="mt-2 text-sm text-(--text-muted)">{item.description}</p>
        </GlassCard>
      ))}
    </section>
  );
}
