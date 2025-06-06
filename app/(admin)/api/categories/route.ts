import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "@/lib/category-service";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";

// GET all categories
export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST create a new category (admin only)
export async function POST(req: NextRequest) {
  await auth.protect();

  try {
    const categoryData: Omit<Category, "id"> = await req.json();

    // Validate required fields
    if (!categoryData.name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = await createCategory(categoryData);
    revalidatePath("/admin/categories");
    revalidatePath("/");
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

// PUT update a category (admin only)
export async function PUT(req: NextRequest) {
  await auth.protect();

  try {
    const categoryData: Category = await req.json();

    // Validate required fields
    if (!categoryData.id || !categoryData.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const category = await updateCategory(categoryData);
    revalidatePath("/admin/categories");
    revalidatePath("/");
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE a category (admin only)
export async function DELETE(req: NextRequest) {
  await auth.protect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing category ID" },
        { status: 400 }
      );
    }

    await deleteCategory(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
