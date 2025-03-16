import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import type { Metadata } from "next";
import { ReservationsTable } from "@/components/admin/reservations-table";
import { getReservations } from "@/lib/reservation-service";

export const metadata: Metadata = {
  title: "Reservasjoner",
  description: "Se og administrer gave reservasjoner",
};

export default async function ReservationsPage() {
  const reservations = await getReservations();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reservasjoner"
        description="Se og administrer gave reservasjoner"
      />
      <ReservationsTable reservations={reservations} />
    </DashboardShell>
  );
}
