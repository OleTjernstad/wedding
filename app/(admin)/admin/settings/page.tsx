import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import type { Metadata } from "next";
import { SettingsForm } from "@/components/admin/settings-form";

export const metadata: Metadata = {
  title: "Innstillinger",
  description: "Administrer dine registerinnstillinger",
};

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Innstillinger"
        description="Administrer dine registerinnstillinger"
      />
      <div className="grid gap-8">
        <SettingsForm />
      </div>
    </DashboardShell>
  );
}
