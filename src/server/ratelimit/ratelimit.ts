"use server";
export async function rateLimit(action: string, user: string) {
  const key = `ratelimit:${action}:${user}`;
}
