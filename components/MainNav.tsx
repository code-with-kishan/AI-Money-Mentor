"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/alerts", label: "Alerts" },
  { href: "/expense-tracker", label: "Expenses" },
  { href: "/net-worth-tracker", label: "Net Worth" },
  { href: "/goal-planner", label: "Goals" },
  { href: "/chat", label: "AI Chat" },
  { href: "/tax-optimizer", label: "Tax" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/future-simulator", label: "Simulator" },
  { href: "/gamification", label: "Achievements" },
  { href: "/profile-setup", label: "Profile" },
  { href: "/architecture", label: "Architecture" },
];

export function MainNav() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login state on mount and pathname change
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("user") || !!localStorage.getItem("userProfile"));
    };
    checkLogin();
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("amm-demo");
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-30 mx-auto w-full max-w-7xl py-6">
      <nav className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-cyan-300 text-sm font-bold text-slate-950">
            A
          </span>
          <span className="display-font text-lg font-semibold tracking-wide text-slate-100 transition group-hover:text-blue-200">
            AI Money Mentor
          </span>
        </Link>
        <div className="flex flex-wrap gap-2 text-sm text-slate-200/90">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full border px-3 py-1.5 transition ${
                pathname === item.href
                  ? "border-blue-300/60 bg-blue-400/12 text-blue-100"
                  : "border-white/10 text-slate-200/90 hover:border-blue-200/40 hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-full border border-red-500/30 px-3 py-1.5 transition text-red-200/90 hover:border-red-400/60 hover:bg-red-500/10 ml-2 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-1.5 transition text-blue-100 hover:border-blue-300 hover:bg-blue-500/20 ml-2"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
