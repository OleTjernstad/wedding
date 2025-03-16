import type { CollectionConfig } from "payload";

const GiftReservations: CollectionConfig = {
  slug: "gift-reservations",
  admin: {
    useAsTitle: "gift",
    defaultColumns: ["gift", "createdAt", "quantity"],
  },
  access: {
    // Anyone can create a reservation
    create: () => true,
    // Only admins and couple can read all reservations
    read: ({ req: { user } }) => {
      if (user?.role) {
        if (["admin", "couple"].includes(user?.role)) return true;
      }

      // Guests can only read their own reservations
      return {
        guestEmail: {
          equals: user?.email,
        },
      };
    },
    // Only admins and couple can update reservations
    update: ({ req: { user } }) =>
      user?.role ? ["admin", "couple"].includes(user?.role) : false,
    // Only admins and couple can delete reservations
    delete: ({ req: { user } }) =>
      user?.role ? ["admin", "couple"].includes(user?.role) : false,
  },
  fields: [
    {
      name: "gift",
      type: "relationship",
      relationTo: "gifts",
      required: true,
    },
    {
      name: "quantity",
      type: "number",
      required: true,
      min: 1,
      defaultValue: 1,
    },
    {
      name: "anonymous",
      type: "checkbox",
      defaultValue: true,
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
        if (operation === "create" || operation === "update") {
          const payload = req.payload;

          // Find all reservations for the gift
          const reservations = await payload.find({
            collection: "gift-reservations",
            where: {
              gift: {
                equals: doc.gift,
              },
            },
          });

          // Calculate total reserved quantity
          const totalReservedQuantity = reservations.docs.reduce(
            (sum, res) => sum + (res.quantity || 0),
            0
          );

          // Find the gift to update its reserved status
          const gift = await payload.findByID({
            collection: "gifts",
            id: doc.gift,
          });

          // Update the gift's reserved and partially reserved status
          await payload.update({
            collection: "gifts",
            id: doc.gift,
            data: {
              reservedQuantity: totalReservedQuantity,
              reserved: totalReservedQuantity >= gift.quantity,
              partiallyReserved:
                totalReservedQuantity > 0 &&
                totalReservedQuantity < gift.quantity,
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

        if (
          reservation &&
          reservation.gift &&
          typeof reservation.gift === "string"
        ) {
          // Find all reservations for the gift
          const reservations = await payload.find({
            collection: "gift-reservations",
            where: {
              gift: {
                equals: reservation.gift,
              },
            },
          });

          // Calculate total reserved quantity excluding the deleted reservation
          const totalReservedQuantity = reservations.docs.reduce(
            (sum, res) => sum + (res.id !== id ? res.quantity || 0 : 0),
            0
          );

          // Find the gift to update its reserved status
          const gift = await payload.findByID({
            collection: "gifts",
            id: reservation.gift,
          });

          // Update the gift's reserved and partially reserved status
          await payload.update({
            collection: "gifts",
            id: reservation.gift,
            data: {
              reservedQuantity: totalReservedQuantity,
              reserved: totalReservedQuantity >= gift.quantity,
              partiallyReserved:
                totalReservedQuantity > 0 &&
                totalReservedQuantity < gift.quantity,
            },
          });
        }
      },
    ],
  },
  timestamps: true,
};

export default GiftReservations;
