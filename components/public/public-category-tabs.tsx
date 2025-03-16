"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Category } from "@/lib/types"

interface PublicCategoryTabsProps {
  categories: Category[]
}

export function PublicCategoryTabs({ categories }: PublicCategoryTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryId = searchParams.get("category")

  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      router.push("/public")
    } else {
      router.push(`/public?category=${value}`)
    }
  }

  return (
    <div className="mb-8">
      <Tabs defaultValue={categoryId || "all"} onValueChange={handleCategoryChange}>
        <TabsList className="w-full flex overflow-x-auto">
          <TabsTrigger value="all">All Gifts</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

