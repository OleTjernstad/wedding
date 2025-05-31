import { LatestReceivedGiftsList } from "@/components/admin/latest-received-gifts-list";
import { Metadata } from "next";
import React from "react";
import { ReceivedGiftForm } from "@/components/admin/received-gift-form";
import { db } from "@/lib/db";
import { getReceivedGifts } from "./get-received-gifts";

export const metadata: Metadata = {
  title: "Mottatte gaver",
  description: "Se og administrer mottatte gaver",
};
export default async function ReceivedGiftsPage() {
  const latest = await db.receivedGift.findFirst({
    orderBy: {
      number: "desc",
    },
  });

  const gifts = await getReceivedGifts();

  return (
    <div className="flex flex-row gap-8 w-full">
      {/* Venstre: Skjema */}
      <div className="w-full max-w-md">
        <div className="border rounded-lg p-6 bg-white dark:bg-zinc-900 shadow">
          <h2 className="text-xl font-semibold mb-4">Registrer mottatt gave</h2>
          <ReceivedGiftForm latest={latest?.number ?? 0} />
        </div>
      </div>
      {/* Høyre: Siste registreringer */}
      <div className="flex-1">
        <div className="border rounded-lg p-6 bg-white dark:bg-zinc-900 shadow">
          <h2 className="text-xl font-semibold mb-4">Siste registreringer</h2>
          <LatestReceivedGiftsList gifts={gifts} />
        </div>
      </div>
    </div>
  );
}
