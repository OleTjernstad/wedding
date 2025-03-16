import { Suspense } from "react"
import type { Metadata } from "next"
import { PublicGiftList } from "@/components/public/public-gift-list"
import { PublicHeader } from "@/components/public/public-header"
import { PublicFooter } from "@/components/public/public-footer"
import { PublicCategoryTabs } from "@/components/public/public-category-tabs"
import { getCategories } from "@/lib/category-service"
import { getPublicGifts } from "@/lib/gift-service"

export const metadata: Metadata = {
  title: "Wedding Gift Registry",
  description: "Browse and reserve wedding gifts",
}

export default async function PublicRegistryPage() {
  const categories = await getCategories()
  const gifts = await getPublicGifts()

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />

      <main className="flex-grow container py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Wedding Gift Registry</h1>

        <Suspense fallback={<div>Loading categories...</div>}>
          <PublicCategoryTabs categories={categories} />
        </Suspense>

        <Suspense fallback={<div>Loading gifts...</div>}>
          <PublicGiftList initialGifts={gifts} />
        </Suspense>
      </main>

      <PublicFooter />
    </div>
  )
}

