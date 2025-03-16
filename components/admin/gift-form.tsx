"use client";

import * as z from "zod";

import type { Category, Gift } from "@/lib/types";
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
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  categoryId: z.string().min(1, "Category is required"),
  link: z.string().url("Must be a valid URL"),
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
          title: "Gift updated",
          description: "The gift has been updated successfully.",
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
          title: "Gift created",
          description: "The gift has been created successfully.",
        });
      }

      router.push("/admin/gifts");
      router.refresh();
    } catch (error) {
      console.error("Error saving gift:", error);
      toast({
        title: "Error",
        description: "Failed to save gift. Please try again.",
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter gift name" {...field} />
              </FormControl>
              <FormDescription>
                The name of the gift as it will appear in the registry.
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter gift description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A detailed description of the gift.
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
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={gift ? gift.reservedQuantity : 1}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The total quantity of this gift available.
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
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
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
                  The category this gift belongs to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter gift link" {...field} />
              </FormControl>
              <FormDescription>A URL to the gift.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : gift ? "Update Gift" : "Create Gift"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/gifts")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
