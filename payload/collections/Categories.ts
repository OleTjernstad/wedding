import type { CollectionConfig } from "payload";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
  },
  access: {
    // Anyone can read categories
    read: () => true,
    // Only admins and couple can create, update, delete
    create: ({ req: { user } }) => ["admin", "couple"].includes(user?.role),
    update: ({ req: { user } }) => ["admin", "couple"].includes(user?.role),
    delete: ({ req: { user } }) => ["admin", "couple"].includes(user?.role),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "This is used for filtering gifts by category",
      },
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};

export default Categories;
