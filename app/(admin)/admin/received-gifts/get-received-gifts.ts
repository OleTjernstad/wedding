import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

// Retrieve all received gifts ordered by number desc, with cache tag
export const getReceivedGifts = unstable_cache(
  async () => {
    return db.receivedGift.findMany({
      orderBy: { number: "desc" },
    });
  },
  ["received-gifts"],
  {
    tags: ["received-gifts"],
  }
);
