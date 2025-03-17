"use client";

import * as z from "zod";

import { Category, Gift } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const giftFormSchema = z.object({
  name: z.string().min(1, "Navn er påkrevd"),
  description: z.string().optional(),
  quantity: z.coerce.number().min(1, "Antall må være minst 1"),
  categoryId: z.string().min(1, "Kategori er påkrevd"),
  link: z.string().url("Må være en gyldig URL"),
  store: z.string().optional(),
});

type GiftFormValues = z.infer<typeof giftFormSchema>;

interface GiftFormProps {
  gift?: Gift;
  categories: Category[];
}

export function GiftForm({ gift, categories }: GiftFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: Partial<GiftFormValues> = {
    name: gift?.name || "",
    description: gift?.description || "",
    quantity: gift?.quantity || 1,
    categoryId: gift?.categoryId || "",
    link: gift?.link || "",
    store: gift?.store || "",
  };

  const form = useForm<GiftFormValues>({
    resolver: zodResolver(giftFormSchema),
    defaultValues,
  });

  async function onSubmit(data: GiftFormValues) {
    setIsLoading(true);

    try {
      if (gift) {
        // Update existing gift
        const response = await fetch("/api/gifts", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: gift.id,
            ...data,
            reservedQuantity: gift.reservedQuantity,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update gift");
        }

        toast({
          title: "Gave oppdatert",
          description: "Gaven har blitt oppdatert.",
        });
      } else {
        // Create new gift
        const response = await fetch("/api/gifts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            reservedQuantity: 0,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create gift");
        }

        toast({
          title: "Gave opprettet",
          description: "Gaven har blitt opprettet.",
        });
      }

      router.push("/admin/gifts");
      router.refresh();
    } catch (error) {
      console.error("Error saving gift:", error);
      toast({
        title: "Feil",
        description: "Kunne ikke lagre gaven. Vennligst prøv igjen.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <Input placeholder="Skriv inn navn på gaven" {...field} />
              </FormControl>
              <FormDescription>
                Navnet på gaven slik det vil vises i registeret.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beskrivelse</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Skriv inn beskrivelse av gaven"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                En detaljert beskrivelse av gaven.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Antall</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={gift ? gift.reservedQuantity : 1}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Totalt antall av denne gaven tilgjengelig.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg en kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Kategoriene denne gaven tilhører.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="store"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Butikk</FormLabel>
              <FormControl>
                <Input placeholder="Skriv inn butikkens navn" {...field} />
              </FormControl>
              <FormDescription>Butikken hvor gaven kan kjøpes.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lenke</FormLabel>
              <FormControl>
                <Input placeholder="Skriv inn lenke til gaven" {...field} />
              </FormControl>
              <FormDescription>En URL til gaven.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Lagrer..." : gift ? "Oppdater gave" : "Opprett gave"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/gifts")}
          >
            Avbryt
          </Button>
        </div>
      </form>
    </Form>
  );
}
