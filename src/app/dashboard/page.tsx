"use client";
import { Dashboard } from "./Dashboard";
import { DashboardGuard } from "./DashboardGuard";

export default function DashboardPage() {
  return (
    <DashboardGuard>
      <Dashboard />
    </DashboardGuard>
  );
}
