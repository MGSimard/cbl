import { createServerFn } from "@tanstack/react-start";
import { rd } from "@/server/rd";
import type { RateLimitAction } from "@/server/utils/serverEnums";

const ratelimitConfig: Record<RateLimitAction, { limit: number; windowSeconds: number }> = {
  mutate: { limit: 5, windowSeconds: 60 }, // 5 requests per 60 seconds
  query: { limit: 20, windowSeconds: 60 }, // 20 requests per 60 seconds
};

interface RateLimitResponse {
  success: boolean;
  message: string;
}
export const rateLimit = createServerFn({ method: "POST" })
  .validator((input: { actionType: RateLimitAction; identifier: string }) => input)
  .handler(async ({ data }): Promise<RateLimitResponse> => {
    try {
      const { actionType, identifier } = data;
      const config = ratelimitConfig[actionType];
      if (!config) throw new Error(`ERROR: Invalid rate limit action: ${actionType}`);

      const key = `ratelimit:${identifier}:${actionType}`;
      const currentCount = await rd.incr(key);
      if (currentCount === 1) await rd.expire(key, config.windowSeconds);
      if (currentCount > config.limit) {
        throw new Error(
          `ERROR: Rate limit exceeded (${actionType}, ${identifier}). Limit is ${config.limit} per ${config.windowSeconds}s.`
        );
      }

      return { success: true, message: "SUCCESS: Request allowed." };
    } catch (err: unknown) {
      return {
        success: false,
        message: err instanceof Error ? err.message : "UNKNOWN RATE LIMIT ERROR",
      };
    }
  });
