import { type Config } from "drizzle-kit";
import { env } from "@/env";

// MIGRATION TODO: env
export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
