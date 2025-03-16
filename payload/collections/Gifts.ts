import type { CollectionConfig } from "payload";
import { authenticated } from "@/access/authenticated";

const Gifts: CollectionConfig = {
  slug: "gifts",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "store", "category", "reserved"],
  },
  access: {
    // Anyone can read gifts
    read: () => true,
    // Only admins and couple can create, update, delete
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "store",
      type: "text",
      required: true,
    },
    {
      name: "link",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "quantity",
      type: "number",
      required: true,
      min: 1,
      defaultValue: 1,
      admin: {
        description: "How many of this gift are wanted",
      },
    },
    {
      name: "reserved",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "partiallyReserved",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "reservedQuantity",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "reservation",
      type: "relationship",
      relationTo: "gift-reservations",
      hasMany: true,
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === "update") {
          const payload = req.payload;
          // Calculate total reserved quantity
          const reservations = await payload.find({
            collection: "gift-reservations",
            where: {
              gift: {
                equals: doc.id,
              },
            },
          });
          const totalReservedQuantity = reservations.docs.reduce(
            (sum, res) => sum + (res.quantity || 0),
            0
          );
          // Update reservation status
          await payload.update({
            collection: "gifts",
            id: doc.id,
            data: {
              reservedQuantity: totalReservedQuantity,
              reserved: totalReservedQuantity >= doc.quantity,
              partiallyReserved:
                totalReservedQuantity > 0 &&
                totalReservedQuantity < doc.quantity,
            },
          });
        }
      },
    ],
  },
};

export default Gifts;
