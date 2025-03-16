import type { Metadata } from "next"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { GiftForm } from "@/components/admin/gift-form"
import { getCategories } from "@/lib/category-service"

export const metadata: Metadata = {
  title: "Add Gift",
  description: "Add a new gift to the registry",
}

export default async function NewGiftPage() {
  const categories = await getCategories()

  return (
    <DashboardShell>
      <DashboardHeader heading="Add Gift" description="Add a new gift to the registry" />
      <div className="grid gap-8">
        <GiftForm categories={categories} />
      </div>
    </DashboardShell>
  )
}

