import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only these routes are public — everything else requires a valid token
const publicRoutes = ["/Login", "/signup"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Logged in, trying to reach login/signup → send them home instead
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Not logged in, trying to reach anything that isn't login/signup → send to login
  if (!isPublicRoute && !token) {
    const loginUrl = new URL("/Login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Run on every route EXCEPT static assets, images, and Next.js internals
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};