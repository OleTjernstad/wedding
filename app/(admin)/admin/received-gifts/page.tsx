import { LatestReceivedGiftsList } from "@/components/admin/latest-received-gifts-list";
import React from "react";
import { ReceivedGiftForm } from "@/components/admin/received-gift-form";

export default function ReceivedGiftsPage() {
  return (
    <div className="flex flex-row gap-8 w-full">
      {/* Left: Form */}
      <div className="w-full max-w-md">
        <div className="border rounded-lg p-6 bg-white dark:bg-zinc-900 shadow">
          <h2 className="text-xl font-semibold mb-4">Register Received Gift</h2>
          <ReceivedGiftForm />
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
