import { db } from "@/lib/db"
import type { Category } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description || undefined,
    }))
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
  }
}

// Get a category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const category = await db.category.findUnique({
      where: { id },
    })

    if (!category) {
      return null
    }

    return {
      id: category.id,
      name: category.name,
      description: category.description || undefined,
    }
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error)
    throw new Error("Failed to fetch category")
  }
}

// Create a new category
export async function createCategory(categoryData: Omit<Category, "id">): Promise<Category> {
  try {
    const category = await db.category.create({
      data: {
        id: uuidv4(),
        name: categoryData.name,
        description: categoryData.description,
      },
    })

    return {
      id: category.id,
      name: category.name,
      description: category.description || undefined,
    }
  } catch (error) {
    console.error("Error creating category:", error)
    throw new Error("Failed to create category")
  }
}

// Update an existing category
export async function updateCategory(categoryData: Category): Promise<Category> {
  try {
    const category = await db.category.update({
      where: { id: categoryData.id },
      data: {
        name: categoryData.name,
        description: categoryData.description,
      },
    })

    return {
      id: category.id,
      name: category.name,
      description: category.description || undefined,
    }
  } catch (error) {
    console.error(`Error updating category with ID ${categoryData.id}:`, error)
    throw new Error("Failed to update category")
  }
}

// Delete a category
export async function deleteCategory(id: string): Promise<void> {
  try {
    await db.category.delete({
      where: { id },
    })
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error)
    throw new Error("Failed to delete category")
  }
}

