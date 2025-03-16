import { CategoryForm } from "@/components/admin/category-form";
import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legg til Kategori",
  description: "Legg til en ny gave kategori",
};

export default function NewCategoryPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Legg til Kategori"
        description="Legg til en ny gave kategori"
      />
      <div className="grid gap-8">
        <CategoryForm />
      </div>
    </DashboardShell>
  );
}
