"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

const settingsFormSchema = z.object({
  registryTitle: z.string().min(1, "Registry title is required"),
  registryDescription: z.string().optional(),
  coupleNames: z.string().min(1, "Couple names are required"),
  eventDate: z.string().optional(),
  enableNotifications: z.boolean().default(false),
  notificationEmail: z.string().email().optional().or(z.literal("")),
})

type SettingsFormValues = z.infer<typeof settingsFormSchema>

export function SettingsForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // In a real application, you would fetch these values from your database
  const defaultValues: Partial<SettingsFormValues> = {
    registryTitle: "Wedding Gift Registry",
    registryDescription: "Our wedding gift registry",
    coupleNames: "John & Jane",
    eventDate: "2025-06-15",
    enableNotifications: false,
    notificationEmail: "",
  }

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  })

  async function onSubmit(data: SettingsFormValues) {
    setIsLoading(true)

    try {
      // In a real application, you would save these values to your database
      console.log("Settings data:", data)

      toast({
        title: "Settings updated",
        description: "Your registry settings have been updated successfully.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
              <FormLabel>Registry Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter registry title" {...field} />
              </FormControl>
              <FormDescription>The title of your gift registry.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="registryDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registry Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter registry description" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormDescription>A brief description of your gift registry.</FormDescription>
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
                <FormLabel>Couple Names</FormLabel>
                <FormControl>
                  <Input placeholder="Enter couple names" {...field} />
                </FormControl>
                <FormDescription>The names of the couple as they will appear in the registry.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>The date of your event.</FormDescription>
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
                <FormLabel className="text-base">Email Notifications</FormLabel>
                <FormDescription>Receive email notifications when gifts are reserved.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notificationEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notification Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter notification email"
                  type="email"
                  disabled={!form.watch("enableNotifications")}
                  {...field}
                />
              </FormControl>
              <FormDescription>The email address where notifications will be sent.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </Form>
  )
}

