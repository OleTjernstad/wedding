import { LatestReceivedGiftsList } from "@/components/admin/latest-received-gifts-list";
import { Metadata } from "next";
import React from "react";
import { ReceivedGiftForm } from "@/components/admin/received-gift-form";
import { db } from "@/lib/db";

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
  return (
    <div className="flex flex-row gap-8 w-full">
      {/* Left: Form */}
      <div className="w-full max-w-md">
        <div className="border rounded-lg p-6 bg-white dark:bg-zinc-900 shadow">
          <h2 className="text-xl font-semibold mb-4">Register Received Gift</h2>
          <ReceivedGiftForm latest={latest?.number ?? 0} />
        </div>
      </div>
      {/* Right: Latest registrations */}
      <div className="flex-1">
        <div className="border rounded-lg p-6 bg-white dark:bg-zinc-900 shadow">
          <h2 className="text-xl font-semibold mb-4">Latest Registrations</h2>
          <LatestReceivedGiftsList />
        </div>
      </div>
    </div>
  );
}
