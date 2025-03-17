"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

interface ReserveGiftFormProps {
  giftId: string;
  giftName: string;
  onSuccess?: (updatedReservationQuantity: number) => void;
}

export default function ReserveGiftForm({
  giftId,
  giftName,
  onSuccess,
}: ReserveGiftFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { toast } = useToast();

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          giftId,
          quantity,
          message,
          anonymous: true,
        }),
      });

      const data = await response.json();

      console.log({ data });

      if (!response.ok) {
        throw new Error(data.error || "Kunne ikke reservere gave");
      }

      setSuccess(true);

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(data.updatedGift.reservedQuantity);
      }

      // Display toast message
      toast({
        title: "Gave reservert!",
        description: `Takk for at du reserverte "${giftName}". Vi gleder oss til å feire dagen med deg/dere.`,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-green-50 rounded-lg border border-green-100">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <CheckCircle className="h-5 w-5" />
          <h3 className="text-lg font-medium">Gave reservert!</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Takk for at du reserverte "{giftName}". Vi gleder oss til å feire
          dagen med deg/dere.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-green-600 hover:bg-green-700"
        >
          Fortsett å bla
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-2">
        <Label htmlFor="quantity">Antall</Label>
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          min={1}
          placeholder="Angi antall"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700"
        disabled={loading}
      >
        {loading ? "Reserverer..." : "Reserver gave"}
      </Button>
    </form>
  );
}
