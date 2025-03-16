import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import { GiftForm } from "@/components/admin/gift-form";
import type { Metadata } from "next";
import { getCategories } from "@/lib/category-service";

export const metadata: Metadata = {
  title: "Legg til Gave",
  description: "Legg til en ny gave til registeret",
};

export default async function NewGiftPage() {
  const categories = await getCategories();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Legg til Gave"
        description="Legg til en ny gave til registeret"
      />
      <div className="grid gap-8">
        <GiftForm categories={categories} />
      </div>
    </DashboardShell>
  );
}
