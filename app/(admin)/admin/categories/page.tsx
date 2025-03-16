import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { CategoriesTable } from "@/components/admin/categories-table"
import { getCategories } from "@/lib/category-service"

export const metadata: Metadata = {
  title: "Categories",
  description: "Manage gift categories",
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <DashboardShell>
      <DashboardHeader heading="Categories" description="Manage gift categories">
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </DashboardHeader>
      <CategoriesTable categories={categories} />
    </DashboardShell>
  )
}

