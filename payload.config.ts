import Categories from "./payload/collections/Categories";
import GiftReservations from "./payload/collections/GiftReservations";
import Gifts from "./payload/collections/Gifts";
// Import globals
import RegistrySettings from "./payload/globals/RegistrySettings";
// Import collections
import Users from "./payload/collections/Users";
import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { postgresAdapter } from "@payloadcms/db-postgres";

export default buildConfig({
  // Configure the database adapter
  db: postgresAdapter({
    // Postgres-specific arguments go here.
    // `pool` is required.
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  // Configure the editor
  editor: lexicalEditor(),

  // Define collections
  collections: [Users, Gifts, Categories, GiftReservations],

  // Define globals
  globals: [RegistrySettings],

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },

  // GraphQL configuration
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },

  // Security configuration
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || "",
    "http://localhost:3000",
  ].filter(Boolean),

  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || "",
    "http://localhost:3000",
  ].filter(Boolean),

  // Secret key for authentication
  secret: process.env.PAYLOAD_SECRET || "your-secret-key-change-me",
});
