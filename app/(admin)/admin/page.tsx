import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/admin/overview"
import { RecentReservations } from "@/components/admin/recent-reservations"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { getGiftStats } from "@/lib/gift-service"
import { getRecentReservations } from "@/lib/reservation-service"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Gift Registry Administration Dashboard",
}

export default async function DashboardPage() {
  const stats = await getGiftStats()
  const recentReservations = await getRecentReservations(5)

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" description="Overview of your gift registry" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gifts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGifts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Gifts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableGifts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fully Reserved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fullyReservedGifts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partially Reserved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.partiallyReservedGifts}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Gift Reservation Overview</CardTitle>
            <CardDescription>Reservation status across all gift categories</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={stats.categoryData} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Reservations</CardTitle>
            <CardDescription>Latest gift reservations made by guests</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentReservations reservations={recentReservations} />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

