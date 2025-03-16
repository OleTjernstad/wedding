"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

import { Category } from "@/lib/types";
import GiftList from "@/components/gift-list";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryTabsProps {
  searchQuery?: string;
  categories: Category[];
}

export default function CategoryTabs({
  searchQuery,
  categories,
}: CategoryTabsProps) {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

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
    );
  }

  return (
    <Tabs
      defaultValue="all"
      value={activeCategory}
      onValueChange={handleCategoryChange}
      className="mb-12"
    >
      <TabsList className="bg-purple-50 border border-purple-100">
        <TabsTrigger value="all">Alle gaver</TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all" className="mt-6">
        <GiftList category="all" searchQuery={searchQuery} />
      </TabsContent>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-6">
          <GiftList category={category.id} searchQuery={searchQuery} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
