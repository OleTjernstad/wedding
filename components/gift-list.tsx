"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";

import { AlertCircle } from "lucide-react";
import GiftCard from "@/components/gift-card";
import { Loader2 } from "lucide-react";
import { getGifts } from "@/lib/api";

interface GiftListProps {
  category?: string;
  searchQuery?: string;
}

export default function GiftList({ category, searchQuery }: GiftListProps) {
  const [gifts, setGifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGifts() {
      try {
        setLoading(true);
        setError(null);

        const result = await getGifts({
          category: category === "all" ? "" : category,
          search: searchQuery,
        });

        setGifts(result.docs || []);
      } catch (err: any) {
        console.error("Error loading gifts:", err);
        setError("Kunne ikke laste gavene. Vennligst prøv igjen senere.");
      } finally {
        setLoading(false);
      }
    }

    loadGifts();
  }, [category, searchQuery]);

  // Handle gift reservation
  const handleGiftReserved = (giftId: string) => {
    // Update the local state to mark the gift as reserved
    setGifts(
      gifts.map((gift) =>
        gift.id === giftId ? { ...gift, reserved: true } : gift
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
        <span className="ml-2 text-purple-600">Laster gaver...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (gifts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          {searchQuery
            ? `Ingen gaver funnet for "${searchQuery}"`
            : "Ingen gaver funnet i denne kategorien"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gifts.map((gift) => (
        <GiftCard
          key={gift.id}
          gift={gift}
          onReserved={() => handleGiftReserved(gift.id)}
        />
      ))}
    </div>
  );
}
