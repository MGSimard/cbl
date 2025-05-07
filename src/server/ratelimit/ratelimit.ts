"use server";
import { rd } from "@/server/rd";
import { RATE_LIMIT_ACTIONS } from "@/server/utils/server-enums";

export async function rateLimit(action: string, user: string) {
  const key = `ratelimit:${action}:${user}`;
}
