import type { CollectionConfig } from "payload";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    // Use email and password for authentication
    useAPIKey: true,
    tokenExpiration: 7200, // 2 hours
    depth: 2,
  },
  admin: {
    useAsTitle: "email",
  },
  access: {
    // Only admins can create users
    create: ({ req }) => req.user?.role === "admin",
    // Users can read their own document
    read: ({ req: { user } }) => {
      // If user has role of admin, they can read all users
      if (user?.role === "admin") return true;

      // Otherwise, users can only read themselves
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    // Users can update their own document
    update: ({ req: { user } }) => {
      // If user has role of admin, they can update all users
      if (user?.role === "admin") return true;

      // Otherwise, users can only update themselves
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "role",
      type: "select",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Couple",
          value: "couple",
        },
        {
          label: "Guest",
          value: "guest",
        },
      ],
      defaultValue: "guest",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "resetPasswordToken",
      type: "text",
      hidden: true,
    },
    {
      name: "resetPasswordExpiration",
      type: "date",
      hidden: true,
    },
  ],
  timestamps: true,
};

export default Users;
