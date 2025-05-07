"use server";
import { createClient } from "redis";
import { RedisCommands } from "@/server/utils/server-types";
const redis = await createClient({ url: process.env.REDIS_URL }).connect();

export async function rateLimit(action: string, user: string) {
  //   get: async (key) => {
  //     const value = await redis.get(key);
  //     return value ? value : null;
  //   },
  //   set: async (key, value, ttl) => {
  //     if (ttl) await redis.set(key, value, { EX: ttl });
  //     else await redis.set(key, value);
  //   },
  //   delete: async (key) => {
  //     await redis.del(key);
  //   },
  // } as RedisCommands,
}
