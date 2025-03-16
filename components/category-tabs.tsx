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
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

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
        <GiftList searchQuery={searchQuery} />
      </TabsContent>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-6">
          <GiftList categoryId={category.id} searchQuery={searchQuery} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
