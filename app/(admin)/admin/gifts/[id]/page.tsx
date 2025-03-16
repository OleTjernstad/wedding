import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { GiftForm } from "@/components/admin/gift-form"
import { getGiftById } from "@/lib/gift-service"
import { getCategories } from "@/lib/category-service"

export const metadata: Metadata = {
  title: "Edit Gift",
  description: "Edit an existing gift in the registry",
}

interface EditGiftPageProps {
  params: {
    id: string
  }
}

export default async function EditGiftPage({ params }: EditGiftPageProps) {
  const gift = await getGiftById(params.id)

  if (!gift) {
    notFound()
  }

  const categories = await getCategories()

  return (
    <DashboardShell>
      <DashboardHeader heading="Edit Gift" description="Edit an existing gift in the registry" />
      <div className="grid gap-8">
        <GiftForm gift={gift} categories={categories} />
      </div>
    </DashboardShell>
  )
}

