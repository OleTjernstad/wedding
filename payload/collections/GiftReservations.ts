import type { CollectionConfig } from "payload";

const GiftReservations: CollectionConfig = {
  slug: "gift-reservations",
  admin: {
    useAsTitle: "guestName",
    defaultColumns: ["guestName", "guestEmail", "gift", "createdAt"],
  },
  access: {
    // Anyone can create a reservation
    create: () => true,
    // Only admins and couple can read all reservations
    read: ({ req: { user } }) => {
      if (["admin", "couple"].includes(user?.role)) return true;

      // Guests can only read their own reservations
      return {
        guestEmail: {
          equals: user?.email,
        },
      };
    },
    // Only admins and couple can update reservations
    update: ({ req: { user } }) => ["admin", "couple"].includes(user?.role),
    // Only admins and couple can delete reservations
    delete: ({ req: { user } }) => ["admin", "couple"].includes(user?.role),
  },
  fields: [
    {
      name: "gift",
      type: "relationship",
      relationTo: "gifts",
      required: true,
    },
    {
      name: "guestName",
      type: "text",
      required: true,
    },
    {
      name: "guestEmail",
      type: "email",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
    },
    {
      name: "anonymous",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "If checked, the guest name will not be shown to the couple",
      },
    },
  ],
  hooks: {
    // Update the gift's reservation field when a reservation is created
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === "create") {
          const payload = req.payload;

          // Update the gift to link to this reservation
          await payload.update({
            collection: "gifts",
            id: doc.gift,
            data: {
              reservation: doc.id,
              reserved: true,
            },
          });
        }
      },
    ],
    // Remove the reservation from the gift when a reservation is deleted
    beforeDelete: [
      async ({ req, id }) => {
        const payload = req.payload;

        // Find the reservation to get the gift ID
        const reservation = await payload.findByID({
          collection: "gift-reservations",
          id,
        });

        if (reservation && reservation.gift) {
          // Update the gift to remove the reservation
          await payload.update({
            collection: "gifts",
            id: reservation.gift,
            data: {
              reservation: null,
              reserved: false,
            },
          });
        }
      },
    ],
  },
  timestamps: true,
};

export default GiftReservations;
