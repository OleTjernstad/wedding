"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReceivedGift } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { saveReceivedGift } from "@/app/(admin)/admin/received-gifts/action";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const receivedGiftFormSchema = z.object({
  number: z.coerce.number().min(1, "Nummer er påkrevd og må være unik"),
  givenBy: z.string().min(1, "Gitt av er påkrevd"),
  comment: z.string().optional(),
});

export type ReceivedGiftFormValues = z.infer<typeof receivedGiftFormSchema>;

interface ReceivedGiftFormProps {
  latest: number;
}
export function ReceivedGiftForm({ latest }: ReceivedGiftFormProps) {
  const form = useForm<ReceivedGiftFormValues>({
    resolver: zodResolver(receivedGiftFormSchema),
    defaultValues: {
      number: latest + 1,
      givenBy: "",
      comment: "",
    },
  });

  async function onSubmit(data: ReceivedGiftFormValues) {
    const response = await saveReceivedGift(data);

    if (response?.success) {
      toast.success("Gave registrert!");
      form.reset();
      form.setValue("number", response.receivedGift.number + 1);
    } else if (response?.error === "number-exists") {
      toast.error("Nummeret er allerede registrert.");
      form.setError("number", { message: "Nummeret er allerede registrert." });
    } else if (response?.error === "data-missing") {
      toast.error("Alle påkrevde felter må fylles ut.");
    } else {
      toast.error("Kunne ikke lagre gave. Prøv igjen.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nummer</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Unikt nummer" {...field} />
              </FormControl>
              <FormDescription>
                Unikt løpenummer for mottatt gave.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="givenBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gitt av</FormLabel>
              <FormControl>
                <Input placeholder="Navn på giver" {...field} />
              </FormControl>
              <FormDescription>
                Navn på den/de som har gitt gaven.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kommentar</FormLabel>
              <FormControl>
                <Textarea placeholder="Valgfri kommentar" {...field} />
              </FormControl>
              <FormDescription>Eventuell kommentar til gaven.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Registrer gave
        </Button>
      </form>
    </Form>
  );
}
