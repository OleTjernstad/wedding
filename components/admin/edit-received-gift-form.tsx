"use client";

import { Button } from "@/components/ui/button";
import { ReceivedGift } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateReceivedGiftComment } from "@/app/(admin)/admin/received-gifts/action";
import { useState } from "react";

interface EditReceivedGiftFormProps {
  gift: ReceivedGift;
  onClose: () => void;
}

export function EditReceivedGiftForm({
  gift,
  onClose,
}: EditReceivedGiftFormProps) {
  const [comment, setComment] = useState(gift.comment || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const response = await updateReceivedGiftComment({ id: gift.id, comment });
    setLoading(false);
    if (response?.success) {
      toast.success("Kommentar oppdatert!");
      onClose();
    } else {
      toast.error("Kunne ikke oppdatere kommentar. Prøv igjen.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 border rounded bg-white dark:bg-zinc-900 shadow space-y-2"
    >
      <div className="font-semibold">
        Rediger kommentar for gave nr. {gift.number} – {gift.givenBy}
      </div>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Valgfri kommentar"
        className="w-full"
      />
      <div className="flex gap-2 mt-2">
        <Button type="submit" disabled={loading} size="sm">
          Lagre
        </Button>
        <Button type="button" variant="outline" onClick={onClose} size="sm">
          Avbryt
        </Button>
      </div>
    </form>
  );
}
