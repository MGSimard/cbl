import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import { admin } from "better-auth/plugins";

import { db } from "@/server/db";
import { rd } from "@/server/rd";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  // https://www.better-auth.com/docs/concepts/rate-limit
  rateLimit: {
    enabled: true,
    window: 120, // Default
    max: 5, // Default
    storage: "secondary-storage", // Redis
    modelName: "rateLimit", // Default
  },
  secondaryStorage: rd,
  plugins: [
    reactStartCookies(),
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
