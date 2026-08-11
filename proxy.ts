import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/Login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Exact public routes
  const isPublicRoute = publicRoutes.includes(pathname);

  // User is NOT logged in
  if (!token && !isPublicRoute) {
    const loginUrl = new URL("/Login", request.url);

    // Remember where the user wanted to go
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // User IS logged in and tries to access Login/Signup
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico)$).*)",
  ],
};