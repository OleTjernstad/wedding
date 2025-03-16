import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { GiftsTable } from "@/components/admin/gifts-table"
import { getGifts } from "@/lib/gift-service"
import { getCategories } from "@/lib/category-service"

export const metadata: Metadata = {
  title: "Gifts",
  description: "Manage gift registry items",
}

export default async function GiftsPage() {
  const gifts = await getGifts()
  const categories = await getCategories()

  return (
    <DashboardShell>
      <DashboardHeader heading="Gifts" description="Manage gift registry items">
        <Button asChild>
          <Link href="/admin/gifts/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Gift
          </Link>
        </Button>
      </DashboardHeader>
      <GiftsTable gifts={gifts} categories={categories} />
    </DashboardShell>
  )
}

