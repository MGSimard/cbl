import { createServerFn } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";

export const getClientIP = createServerFn({ method: "GET" }).handler(async () => {
  const headrs = getHeaders();
  const forwardedFor = headrs["x-forwarded-for"];
  const realIP = headrs["x-real-ip"];
  return forwardedFor?.split(",")[0]?.trim() || realIP?.trim() || "0.0.0.0";
});
