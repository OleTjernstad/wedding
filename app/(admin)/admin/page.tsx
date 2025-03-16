import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import type { Metadata } from "next";
import { Overview } from "@/components/admin/overview";
import { RecentReservations } from "@/components/admin/recent-reservations";
import { getGiftStats } from "@/lib/gift-service";
import { getRecentReservations } from "@/lib/reservation-service";

export const metadata: Metadata = {
  title: "Dashbord",
  description: "Gave Register Administrasjons Dashbord",
};

export default async function DashboardPage() {
  const stats = await getGiftStats();
  const recentReservations = await getRecentReservations(5);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashbord"
        description="Oversikt over gave registeret ditt"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Gaver</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGifts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tilgjengelige Gaver
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableGifts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Fullt Reserverte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fullyReservedGifts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Delvis Reserverte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.partiallyReservedGifts}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Gave Reservasjons Oversikt</CardTitle>
            <CardDescription>
              Reservasjonsstatus på tvers av alle gavekategorier
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={stats.categoryData} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Siste Reservasjoner</CardTitle>
            <CardDescription>
              Siste gave reservasjoner gjort av gjester
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentReservations reservations={recentReservations} />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
