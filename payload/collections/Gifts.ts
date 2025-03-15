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
      name: "reserved",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "reservation",
      type: "relationship",
      relationTo: "gift-reservations",
      hasMany: false,
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    // Update reserved status when a reservation is created or deleted
    afterChange: [
      async ({ doc, req, operation, previousDoc }) => {
        if (operation === "update") {
          const payload = req.payload;

          // If reservation was added
          if (!previousDoc.reservation && doc.reservation) {
            await payload.update({
              collection: "gifts",
              id: doc.id,
              data: {
                reserved: true,
              },
            });
          }

          // If reservation was removed
          if (previousDoc.reservation && !doc.reservation) {
            await payload.update({
              collection: "gifts",
              id: doc.id,
              data: {
                reserved: false,
              },
            });
          }
        }
      },
    ],
  },
};

export default Gifts;
