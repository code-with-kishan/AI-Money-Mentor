"use client";

import { loadDemo } from "@/lib/apiClient";
import { LoaderDots } from "@/components/Skeleton";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DemoButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDemo = async () => {
    try {
      setLoading(true);
      const data = await loadDemo();
      localStorage.setItem("amm-demo", JSON.stringify(data));
      router.push("/dashboard?demo=1");
    } catch (error) {
      console.error(error);
      alert("Unable to load demo profile. Check MongoDB connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDemo}
      disabled={loading}
      className="premium-button display-font rounded-full px-6 py-3 text-sm"
    >
      {loading ? <LoaderDots label="Loading demo" /> : "Try Demo"}
    </button>
  );
}
