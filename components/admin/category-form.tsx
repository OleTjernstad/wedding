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
import { toast } from "@/components/ui/use-toast"
import type { Category } from "@/lib/types"

const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

interface CategoryFormProps {
  category?: Category
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const defaultValues: Partial<CategoryFormValues> = {
    name: category?.name || "",
    description: category?.description || "",
  }

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  })

  async function onSubmit(data: CategoryFormValues) {
    setIsLoading(true)

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
        })

        if (!response.ok) {
          throw new Error("Failed to update category")
        }

        toast({
          title: "Category updated",
          description: "The category has been updated successfully.",
        })
      } else {
        // Create new category
        const response = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error("Failed to create category")
        }

        toast({
          title: "Category created",
          description: "The category has been created successfully.",
        })
      }

      router.push("/admin/categories")
      router.refresh()
    } catch (error) {
      console.error("Error saving category:", error)
      toast({
        title: "Error",
        description: "Failed to save category. Please try again.",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormDescription>The name of the category as it will appear in the registry.</FormDescription>
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
                <Textarea placeholder="Enter category description (optional)" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormDescription>An optional description of the category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : category ? "Update Category" : "Create Category"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

