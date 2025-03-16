import type { Metadata } from "next"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { CategoryForm } from "@/components/admin/category-form"

export const metadata: Metadata = {
  title: "Add Category",
  description: "Add a new gift category",
}

export default function NewCategoryPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Add Category" description="Add a new gift category" />
      <div className="grid gap-8">
        <CategoryForm />
      </div>
    </DashboardShell>
  )
}

