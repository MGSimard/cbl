import { headers } from "next/headers";

export async function getClientIP() {
  const headrs = await headers();
  const forwardedFor = headrs.get("x-forwarded-for");
  const realIP = headrs.get("x-real-ip");
  return forwardedFor?.split(",")[0]?.trim() || realIP?.trim() || "0.0.0.0";
}
