import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import { GiftForm } from "@/components/admin/gift-form";
import type { Metadata } from "next";
import { getCategories } from "@/lib/category-service";
import { getGiftById } from "@/lib/gift-service";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Gift",
  description: "Edit an existing gift in the registry",
};

export type paramsType = Promise<{ id: string }>;

export default async function EditGiftPage(props: { params: paramsType }) {
  const { id } = await props.params;

  const gift = await getGiftById(id);

  if (!gift) {
    notFound();
  }

  const categories = await getCategories();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Edit Gift"
        description="Edit an existing gift in the registry"
      />
      <div className="grid gap-8">
        <GiftForm gift={gift} categories={categories} />
      </div>
    </DashboardShell>
  );
}
