"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

type MoneyCounterProps = {
  value: number;
  className?: string;
};

export function MoneyCounter({ value, className = "" }: MoneyCounterProps) {
  const valueRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const state = { val: 0 };
    if (!valueRef.current) return;

    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

    const tween = gsap.to(state, {
      val: value,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = formatter.format(Math.round(state.val));
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [value]);

  return <span ref={valueRef} className={className}>INR 0</span>;
}
