import { createClient } from "redis";

export const redis = await createClient({ url: process.env.REDIS_URL }).connect();

export interface RedisCommands {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string, ttl?: number) => Promise<void>;
  delete: (key: string) => Promise<void>;
  incr: (key: string) => Promise<number>;
  expire: (key: string, seconds: number) => Promise<number>;
}

export const rd: RedisCommands = {
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
  incr: async (key) => {
    return await redis.incr(key);
  },
  expire: async (key, seconds) => {
    return await redis.expire(key, seconds);
  },
};
