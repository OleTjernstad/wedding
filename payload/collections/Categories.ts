import type { CollectionConfig } from "payload";
import { authenticated } from "@/access/authenticated";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
  },
  access: {
    // Anyone can read categories
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
