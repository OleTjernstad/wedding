import type { Metadata } from "next"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { ReservationsTable } from "@/components/admin/reservations-table"
import { getReservations } from "@/lib/reservation-service"

export const metadata: Metadata = {
  title: "Reservations",
  description: "View and manage gift reservations",
}

export default async function ReservationsPage() {
  const reservations = await getReservations()

  return (
    <DashboardShell>
      <DashboardHeader heading="Reservations" description="View and manage gift reservations" />
      <ReservationsTable reservations={reservations} />
    </DashboardShell>
  )
}

