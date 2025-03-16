import type { Gift, GiftStats, GiftWithCategory } from "@/lib/types";

import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// Get all gifts with category information
export async function getGifts(): Promise<GiftWithCategory[]> {
  try {
    const gifts = await db.gift.findMany({
      include: {
        category: true,
      },
    });

    return gifts.map((gift) => ({
      id: gift.id,
      name: gift.name,
      description: gift.description || "",
      quantity: gift.quantity,
      reservedQuantity: gift.reservedQuantity,
      categoryId: gift.categoryId,
      imageUrl: gift.imageUrl || undefined,
      category: {
        id: gift.category.id,
        name: gift.category.name,
        description: gift.category.description || undefined,
      },
    }));
  } catch (error) {
    console.error("Error fetching gifts:", error);
    throw new Error("Failed to fetch gifts");
  }
}

// Get public gifts (for the public registry)
export async function getPublicGifts(
  categoryId?: string,
  search?: string
): Promise<Gift[]> {
  try {
    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (search) where.name = { contains: search, mode: "insensitive" };

    console.log({ where });
    const gifts = await db.gift.findMany({
      where,
      orderBy: {
        name: "asc",
      },
    });

    return gifts.map((gift) => ({
      id: gift.id,
      name: gift.name,
      description: gift.description || "",
      quantity: gift.quantity,
      reservedQuantity: gift.reservedQuantity,
      categoryId: gift.categoryId,
      imageUrl: gift.imageUrl || undefined,
    }));
  } catch (error) {
    console.error("Error fetching public gifts:", error);
    throw new Error("Failed to fetch public gifts");
  }
}

// Get a gift by ID
export async function getGiftById(id: string): Promise<Gift | null> {
  try {
    const gift = await db.gift.findUnique({
      where: { id },
    });

    if (!gift) {
      return null;
    }

    return {
      id: gift.id,
      name: gift.name,
      description: gift.description || "",
      quantity: gift.quantity,
      reservedQuantity: gift.reservedQuantity,
      categoryId: gift.categoryId,
      imageUrl: gift.imageUrl || undefined,
    };
  } catch (error) {
    console.error(`Error fetching gift with ID ${id}:`, error);
    throw new Error("Failed to fetch gift");
  }
}

// Create a new gift
export async function createGift(giftData: Omit<Gift, "id">): Promise<Gift> {
  try {
    const gift = await db.gift.create({
      data: {
        id: uuidv4(),
        name: giftData.name,
        description: giftData.description,
        quantity: giftData.quantity,
        reservedQuantity: giftData.reservedQuantity || 0,
        categoryId: giftData.categoryId,
        imageUrl: giftData.imageUrl,
      },
    });

    return {
      id: gift.id,
      name: gift.name,
      description: gift.description || "",
      quantity: gift.quantity,
      reservedQuantity: gift.reservedQuantity,
      categoryId: gift.categoryId,
      imageUrl: gift.imageUrl || undefined,
    };
  } catch (error) {
    console.error("Error creating gift:", error);
    throw new Error("Failed to create gift");
  }
}

// Update an existing gift
export async function updateGift(giftData: Gift): Promise<Gift> {
  try {
    const gift = await db.gift.update({
      where: { id: giftData.id },
      data: {
        name: giftData.name,
        description: giftData.description,
        quantity: giftData.quantity,
        reservedQuantity: giftData.reservedQuantity,
        categoryId: giftData.categoryId,
        imageUrl: giftData.imageUrl,
      },
    });

    return {
      id: gift.id,
      name: gift.name,
      description: gift.description || "",
      quantity: gift.quantity,
      reservedQuantity: gift.reservedQuantity,
      categoryId: gift.categoryId,
      imageUrl: gift.imageUrl || undefined,
    };
  } catch (error) {
    console.error(`Error updating gift with ID ${giftData.id}:`, error);
    throw new Error("Failed to update gift");
  }
}

// Delete a gift
export async function deleteGift(id: string): Promise<void> {
  try {
    await db.gift.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting gift with ID ${id}:`, error);
    throw new Error("Failed to delete gift");
  }
}

// Get gift statistics for dashboard
export async function getGiftStats(): Promise<GiftStats> {
  try {
    const gifts = await db.gift.findMany({
      include: {
        category: true,
      },
    });

    const totalGifts = gifts.length;
    const fullyReservedGifts = gifts.filter(
      (gift) => gift.quantity === gift.reservedQuantity
    ).length;
    const partiallyReservedGifts = gifts.filter(
      (gift) =>
        gift.reservedQuantity > 0 && gift.quantity > gift.reservedQuantity
    ).length;
    const availableGifts = gifts.filter(
      (gift) => gift.reservedQuantity < gift.quantity
    ).length;

    // Group by category
    const categoriesMap = new Map<
      string,
      { name: string; available: number; reserved: number }
    >();

    gifts.forEach((gift) => {
      const categoryName = gift.category.name;
      const available = gift.quantity - gift.reservedQuantity;
      const reserved = gift.reservedQuantity;

      if (!categoriesMap.has(categoryName)) {
        categoriesMap.set(categoryName, {
          name: categoryName,
          available: 0,
          reserved: 0,
        });
      }

      const category = categoriesMap.get(categoryName)!;
      category.available += available;
      category.reserved += reserved;
    });

    const categoryData = Array.from(categoriesMap.values());

    return {
      totalGifts,
      availableGifts,
      fullyReservedGifts,
      partiallyReservedGifts,
      categoryData,
    };
  } catch (error) {
    console.error("Error fetching gift statistics:", error);
    throw new Error("Failed to fetch gift statistics");
  }
}
