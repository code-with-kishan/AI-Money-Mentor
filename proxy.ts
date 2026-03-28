import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add the routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/portfolio",
  "/future-simulator",
  "/tax-optimizer",
  "/expense-tracker",
  "/net-worth-tracker",
  "/goal-planner",
  "/profile-setup",
  "/simulate",
  "/analyze",
  "/insights",
  "/sip",
  "/tax",
  "/user"
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  // Root redirect behavior
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Allow public access to landing page (/) if not authenticated
    return NextResponse.next();
  }

  // Prevent logged-in users from seeing the login page
  if (pathname.startsWith("/login")) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    // Redirect to login if accessing a protected route without a token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Ignore static files, api routes, and Next.js internals
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
