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
import { Category } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Navn er påkrevd"),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  category?: Category;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: Partial<CategoryFormValues> = {
    name: category?.name || "",
    description: category?.description || "",
  };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  async function onSubmit(data: CategoryFormValues) {
    setIsLoading(true);

    try {
      if (category) {
        // Update existing category
        const response = await fetch("/api/categories", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: category.id,
            ...data,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update category");
        }

        toast({
          title: "Kategori oppdatert",
          description: "Kategorien har blitt oppdatert.",
        });
      } else {
        // Create new category
        const response = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to create category");
        }

        toast({
          title: "Kategori opprettet",
          description: "Kategorien har blitt opprettet.",
        });
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "Feil",
        description: "Kunne ikke lagre kategorien. Vennligst prøv igjen.",
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
                <Input placeholder="Skriv inn navn på kategorien" {...field} />
              </FormControl>
              <FormDescription>
                Navnet på kategorien slik det vil vises i registeret.
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
                  placeholder="Skriv inn beskrivelse av kategorien (valgfritt)"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                En valgfri beskrivelse av kategorien.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Lagrer..."
              : category
                ? "Oppdater kategori"
                : "Opprett kategori"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/categories")}
          >
            Avbryt
          </Button>
        </div>
      </form>
    </Form>
  );
}
