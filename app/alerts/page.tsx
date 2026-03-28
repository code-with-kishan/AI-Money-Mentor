"use client";

import { PageShell } from "@/components/PageShell";
import { SmartAlerts } from "@/components/SmartAlerts";

export default function AlertsPage() {
  return (
    <PageShell 
      title="Smart Alerts & Notifications" 
      subtitle="Get proactive insights and warnings about your financial health."
    >
      <SmartAlerts />
    </PageShell>
  );
}
