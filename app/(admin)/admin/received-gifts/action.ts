"use server";

import { ReceivedGiftFormValues } from "@/components/admin/received-gift-form";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function saveReceivedGift(formData: ReceivedGiftFormValues) {
  await auth.protect();

  const uniqueCheck = await db.receivedGift.findUnique({
    where: {
      number: formData.number,
    },
  });

  if (uniqueCheck) {
    return { error: "number-exists" };
  }

  if (!formData.givenBy || !formData.number) {
    return { error: "data-missing" };
  }

  try {
    const created = await db.receivedGift.create({
      data: {
        number: formData.number,
        givenBy: formData.givenBy,
        comment: formData.comment || null,
      },
    });

    revalidateTag("received-gifts");

    return { success: true, receivedGift: created };
  } catch (err: any) {
    console.log(err);
    return { error: "error" };
  }
}

export async function updateReceivedGiftComment({
  id,
  comment,
}: {
  id: string;
  comment: string;
}) {
  await auth.protect();
  if (!id) return { error: "missing-id" };
  try {
    const updated = await db.receivedGift.update({
      where: { id },
      data: { comment },
    });
    revalidateTag("received-gifts");
    return { success: true, receivedGift: updated };
  } catch (err: any) {
    console.log(err);
    return { error: "error" };
  }
}
