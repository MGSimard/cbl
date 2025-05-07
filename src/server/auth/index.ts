import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  rateLimit: {
    // https://www.better-auth.com/docs/concepts/rate-limit
    enabled: true,
    window: 10, // 10 seconds
    max: 100, // 100 requests
    storage: "database", // Use redis upstash memory later
    modelName: "rateLimit",
  },
  plugins: [
    admin(), // Administration docs: https://www.better-auth.com/docs/plugins/admin
  ],
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
