import { Button } from "@/components/ui/button";
import { CategoriesTable } from "@/components/admin/categories-table";
import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { getCategories } from "@/lib/category-service";

export const metadata: Metadata = {
  title: "Kategorier",
  description: "Administrer gave kategorier",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Kategorier"
        description="Administrer gave kategorier"
      >
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Legg til Kategori
          </Link>
        </Button>
      </DashboardHeader>
      <CategoriesTable categories={categories} />
    </DashboardShell>
  );
}
