import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default async function authMiddleware(request: NextRequest) {
  const reqPath = request.nextUrl.pathname;
  const cookies = getSessionCookie(request);

  // If accessing dashboard check for RBAC (Admin only)
  // if (/* TODO: RBAC */ && reqPath.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // If accessing sign-in, redirect to home if already signed in
  if (cookies && reqPath === "/sign-in") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/sign-in", "/dashboard/:path*"],
};
