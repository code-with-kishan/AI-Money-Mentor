"use client";

import { ReactNode } from "react";

/**
 * WelcomeGate — removed the 1.7-second artificial loading delay.
 * Content now renders instantly.
 */
export function WelcomeGate({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
