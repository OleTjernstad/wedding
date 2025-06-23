"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";

import { EditReceivedGiftForm } from "./edit-received-gift-form";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { ReceivedGift } from "@prisma/client";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface LatestReceivedGiftsListProps {
  gifts: ReceivedGift[];
}
export function LatestReceivedGiftsList({
  gifts,
}: LatestReceivedGiftsListProps) {
  const [editingGift, setEditingGift] = useState<ReceivedGift | null>(null);

  return (
    <div className="space-y-4">
      <Dialog open={!!editingGift} onOpenChange={() => setEditingGift(null)}>
        <DialogContent>
          <DialogTitle asChild>
            <VisuallyHidden>Rediger gavekommentar</VisuallyHidden>
          </DialogTitle>
          {editingGift && (
            <EditReceivedGiftForm
              gift={editingGift}
              onClose={() => setEditingGift(null)}
            />
          )}
        </DialogContent>
      </Dialog>
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
                <button
                  className="ml-2 text-xs text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
                  onClick={() => setEditingGift(gift)}
                  type="button"
                  aria-label="Rediger kommentar"
                >
                  <Pencil2Icon className="w-4 h-4" />
                </button>
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
