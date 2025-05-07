import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db";
import { createClient } from "redis";
import { RedisCommands } from "@/server/utils/server-types";

const redis = await createClient({ url: process.env.REDIS_URL }).connect();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  // https://www.better-auth.com/docs/concepts/rate-limit
  rateLimit: {
    enabled: true,
    window: 60, // Default
    max: 100, // Default
    storage: "secondary-storage", // Redis
    modelName: "rateLimit", // Default
  },
  secondaryStorage: {
    get: async (key) => {
      const value = await redis.get(key);
      return value ? value : null;
    },
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, { EX: ttl });
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await redis.del(key);
    },
  } as RedisCommands,
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
