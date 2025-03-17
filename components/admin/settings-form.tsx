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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const settingsFormSchema = z.object({
  registryTitle: z.string().min(1, "Tittel på registeret er påkrevd"),
  registryDescription: z.string().optional(),
  coupleNames: z.string().min(1, "Navn på paret er påkrevd"),
  eventDate: z.string().optional(),
  enableNotifications: z.boolean().default(false),
  notificationEmail: z.string().email().optional().or(z.literal("")),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export function SettingsForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // In a real application, you would fetch these values from your database
  const defaultValues: Partial<SettingsFormValues> = {
    registryTitle: "Bryllupsgaveliste",
    registryDescription: "Vår bryllupsgaveliste",
    coupleNames: "John & Jane",
    eventDate: "2025-06-15",
    enableNotifications: false,
    notificationEmail: "",
  };

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  async function onSubmit(data: SettingsFormValues) {
    setIsLoading(true);

    try {
      // In a real application, you would save these values to your database
      console.log("Settings data:", data);

      toast({
        title: "Innstillinger oppdatert",
        description: "Dine registerinnstillinger er oppdatert.",
      });

      router.refresh();
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Feil",
        description: "Kunne ikke lagre innstillinger. Vennligst prøv igjen.",
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
          name="registryTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tittel på registeret</FormLabel>
              <FormControl>
                <Input
                  placeholder="Skriv inn tittel på registeret"
                  {...field}
                />
              </FormControl>
              <FormDescription>Tittelen på din gaveliste.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="registryDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beskrivelse av registeret</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Skriv inn beskrivelse av registeret"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                En kort beskrivelse av din gaveliste.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="coupleNames"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Navn på paret</FormLabel>
                <FormControl>
                  <Input placeholder="Skriv inn navn på paret" {...field} />
                </FormControl>
                <FormDescription>
                  Navnene på paret slik de vil vises i registeret.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dato for arrangementet</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  Datoen for arrangementet ditt.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="enableNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">E-postvarsler</FormLabel>
                <FormDescription>
                  Motta e-postvarsler når gaver blir reservert.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notificationEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Varslings-e-post</FormLabel>
              <FormControl>
                <Input
                  placeholder="Skriv inn varslings-e-post"
                  type="email"
                  disabled={!form.watch("enableNotifications")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                E-postadressen hvor varsler vil bli sendt.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Lagrer..." : "Lagre innstillinger"}
        </Button>
      </form>
    </Form>
  );
}
