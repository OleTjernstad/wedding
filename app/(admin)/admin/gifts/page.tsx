import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import { GiftsTable } from "@/components/admin/gifts-table";
import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { getCategories } from "@/lib/category-service";
import { getGifts } from "@/lib/gift-service";

export const metadata: Metadata = {
  title: "Gaver",
  description: "Administrer gave register elementer",
};

export default async function GiftsPage() {
  const gifts = await getGifts();
  const categories = await getCategories();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Gaver"
        description="Administrer gave register elementer"
      >
        <Button asChild>
          <Link href="/admin/gifts/new">
            <Plus className="mr-2 h-4 w-4" />
            Legg til Gave
          </Link>
        </Button>
      </DashboardHeader>
      <GiftsTable gifts={gifts} categories={categories} />
    </DashboardShell>
  );
}
