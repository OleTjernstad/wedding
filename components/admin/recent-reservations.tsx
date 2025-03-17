import { Gift, Reservation } from "@prisma/client";

import { formatDistanceToNow } from "date-fns";

interface RecentReservationsProps {
  reservations: (Reservation & { gift: Gift })[];
}

export function RecentReservations({ reservations }: RecentReservationsProps) {
  if (reservations.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
        <p className="text-sm text-muted-foreground">
          Ingen nylige reservasjoner
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <div key={reservation.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {reservation.gift?.name} (x{reservation.quantity})
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
