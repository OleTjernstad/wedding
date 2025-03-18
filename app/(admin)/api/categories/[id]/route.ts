import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCategoryById } from "@/lib/category-service";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

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

    const gifts = await db.gift.findMany({
      where: { categoryId: params.id },
    });

    if (gifts.length > 0) {
      return NextResponse.json(
        { error: "Flytt gaver til en annen kategori før sletting" },
        { status: 400 }
      );
    }

    await db.category.delete({
      where: { id: params.id },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting category with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
