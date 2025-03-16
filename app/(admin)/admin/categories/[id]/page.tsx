import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { CategoryForm } from "@/components/admin/category-form"
import { getCategoryById } from "@/lib/category-service"

export const metadata: Metadata = {
  title: "Edit Category",
  description: "Edit an existing gift category",
}

interface EditCategoryPageProps {
  params: {
    id: string
  }
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const category = await getCategoryById(params.id)

  if (!category) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Edit Category" description="Edit an existing gift category" />
      <div className="grid gap-8">
        <CategoryForm category={category} />
      </div>
    </DashboardShell>
  )
}

