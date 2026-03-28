import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function GlassCard({ children, className = "", id }: GlassCardProps) {
  return (
    <div 
      id={id}
      className={`glass group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-900/60 ${className}`}
    >
      {children}
    </div>
  );
}
