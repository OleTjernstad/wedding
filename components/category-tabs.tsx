"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import GiftList from "@/components/gift-list"
import { getCategories } from "@/lib/api"

interface CategoryTabsProps {
  searchQuery?: string
}

export default function CategoryTabs({ searchQuery }: CategoryTabsProps) {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true)
        const result = await getCategories()
        setCategories(result.docs || [])
      } catch (err) {
        console.error("Error loading categories:", err)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value)
  }

  if (loading) {
    return (
      <div className="mb-12">
        <Skeleton className="h-10 w-full mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <Tabs defaultValue="all" value={activeCategory} onValueChange={handleCategoryChange} className="mb-12">
      <TabsList className="bg-purple-50 border border-purple-100">
        <TabsTrigger value="all">Alle gaver</TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.slug}>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all" className="mt-6">
        <GiftList category="all" searchQuery={searchQuery} />
      </TabsContent>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.slug} className="mt-6">
          <GiftList category={category.slug} searchQuery={searchQuery} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

