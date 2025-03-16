import type { Metadata } from "next"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { SettingsForm } from "@/components/admin/settings-form"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your registry settings",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" description="Manage your registry settings" />
      <div className="grid gap-8">
        <SettingsForm />
      </div>
    </DashboardShell>
  )
}

