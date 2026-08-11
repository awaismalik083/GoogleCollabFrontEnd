import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/"];
const authRoutes = ["/Login", "/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Not logged in, trying to reach a protected page → send to login
  if (isProtected && !token) {
    const loginUrl = new URL("/Login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in, trying to reach login/signup → send to home
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notebook/:path*", "/Login", "/signup"],
};