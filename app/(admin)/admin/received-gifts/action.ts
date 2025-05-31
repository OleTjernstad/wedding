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
