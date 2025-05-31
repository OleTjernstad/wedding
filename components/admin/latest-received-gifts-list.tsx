import React from "react";
import { ReceivedGift } from "@prisma/client";

interface LatestReceivedGiftsListProps {
  gifts: ReceivedGift[];
}
export function LatestReceivedGiftsList({
  gifts,
}: LatestReceivedGiftsListProps) {
  return (
    <div className="space-y-4">
      {gifts.length === 0 ? (
        <div className="text-muted-foreground text-sm">
          Ingen registrerte gaver ennå.
        </div>
      ) : (
        <ul className="divide-y divide-muted">
          {gifts.map((gift) => (
            <li key={gift.id} className="py-2">
              <div className="flex flex-row items-center gap-2">
                <span className="font-medium text-muted-foreground">
                  Nr. {gift.number}
                </span>
                <span className="font-medium"> – {gift.givenBy}</span>
              </div>
              {gift.comment && (
                <div className="text-xs text-muted-foreground italic mt-1">
                  {gift.comment}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
