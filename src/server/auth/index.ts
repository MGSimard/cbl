import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  rateLimit: {
    // https://www.better-auth.com/docs/reference/options#ratelimit
    storage: "database", // Use redis upstash memory later
  },
  plugins: [
    admin(), // Administration docs: https://www.better-auth.com/docs/plugins/admin
  ],
});
