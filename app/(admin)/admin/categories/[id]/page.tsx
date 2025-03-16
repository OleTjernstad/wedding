import { CategoryForm } from "@/components/admin/category-form";
import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import type { Metadata } from "next";
import { getCategoryById } from "@/lib/category-service";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Rediger Kategori",
  description: "Rediger en eksisterende gave kategori",
};

export type paramsType = Promise<{ id: string }>;

export default async function EditCategoryPage(props: { params: paramsType }) {
  const { id } = await props.params;

  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Rediger Kategori"
        description="Rediger en eksisterende gave kategori"
      />
      <div className="grid gap-8">
        <CategoryForm category={category} />
      </div>
    </DashboardShell>
  );
}
