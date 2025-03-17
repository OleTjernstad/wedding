import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCategoryById } from "@/lib/category-service";

// GET a specific category by ID (public)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await getCategoryById(params.id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(`Error fetching category with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// DELETE a specific category by ID (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await auth.protect();

  try {
    const category = await getCategoryById(params.id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // In a real application, you would delete the category from your database
    // await deleteCategory(params.id)

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting category with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
