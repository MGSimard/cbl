import { createClient } from "redis";

// Create and connect the Redis client in the background (no top-level await)
const client = createClient({ url: process.env.REDIS_URL });
client.connect().catch((err) => {
  console.error("Redis connection error:", err);
});

export interface RedisCommands {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string, ttl?: number) => Promise<void>;
  delete: (key: string) => Promise<void>;
  incr: (key: string) => Promise<number>;
  expire: (key: string, seconds: number) => Promise<number>;
}

export const rd: RedisCommands = {
  get: async (key) => {
    const value = await client.get(key);
    return value ? value : null;
  },
  set: async (key, value, ttl) => {
    if (ttl) await client.set(key, value, { EX: ttl });
    else await client.set(key, value);
  },
  delete: async (key) => {
    await client.del(key);
  },
  incr: async (key) => {
    return await client.incr(key);
  },
  expire: async (key, seconds) => {
    return await client.expire(key, seconds);
  },
};
