export const RATE_LIMIT_ACTIONS = ["mutate", "query"] as const;
export type RateLimitAction = (typeof RATE_LIMIT_ACTIONS)[number];
