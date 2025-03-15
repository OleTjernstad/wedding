import type { GlobalConfig } from "payload";

const RegistrySettings: GlobalConfig = {
  slug: "registry-settings",
  access: {
    // Anyone can read registry settings
    read: () => true,
    // Only admins and couple can update
    update: ({ req: { user } }) => ["admin", "couple"].includes(user?.role),
  },
  fields: [
    {
      name: "coupleNames",
      type: "text",
      required: true,
    },
    {
      name: "weddingDate",
      type: "date",
      required: true,
    },
    {
      name: "welcomeMessage",
      type: "richText",
      required: true,
    },
    {
      name: "shareMessage",
      type: "richText",
      required: true,
    },
    {
      name: "footerText",
      type: "text",
      required: true,
    },
    {
      name: "primaryColor",
      type: "text",
      defaultValue: "#6b21a8", // Purple 800
    },
    {
      name: "secondaryColor",
      type: "text",
      defaultValue: "#f3e8ff", // Purple 100
    },
  ],
};

export default RegistrySettings;
