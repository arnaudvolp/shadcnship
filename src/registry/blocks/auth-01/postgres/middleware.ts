/**
 * PostgreSQL Auth Middleware Example (JWT-based)
 *
 * This middleware protects routes by verifying JWT tokens stored in cookies.
 * Copy this to your `src/middleware.ts` file.
 *
 * Prerequisites:
 * 1. Install jose: pnpm add jose
 * 2. Set JWT_SECRET in your environment variables
 *
 * @example
 * // middleware.ts (at project root or src/)
 * export { middleware, config } from "@/components/auth-01/postgres/middleware"
 *
 * // Or customize the config:
 * export { middleware } from "@/components/auth-01/postgres/middleware"
 * export const config = {
 *   matcher: ["/dashboard/:path*", "/settings/:path*"],
 * }
 */

import { type NextRequest, NextResponse } from "next/server";

// =============================================================================
// JWT VERIFICATION IMPLEMENTATION
// =============================================================================

/**
 * Verify JWT token from cookies
 */
// import { jwtVerify } from "jose";
//
// async function verifyAuth(request: NextRequest) {
//   const token = request.cookies.get("auth-token")?.value;
//
//   if (!token) {
//     return null;
//   }
//
//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     return payload;
//   } catch {
//     return null;
//   }
// }

/**
 * Middleware function to protect routes
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // =============================================================================
  // JWT IMPLEMENTATION (uncomment when ready)
  // =============================================================================
  // const user = await verifyAuth(request);
  //
  // // Define protected routes
  // const protectedRoutes = ["/dashboard", "/settings", "/profile"];
  // const authRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"];
  // const adminRoutes = ["/admin"];
  //
  // const isProtectedRoute = protectedRoutes.some((route) =>
  //   pathname.startsWith(route)
  // );
  // const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  // const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  //
  // // Redirect unauthenticated users from protected routes
  // if (isProtectedRoute && !user) {
  //   const redirectUrl = new URL("/auth/login", request.url);
  //   redirectUrl.searchParams.set("redirect", pathname);
  //   return NextResponse.redirect(redirectUrl);
  // }
  //
  // // Check admin access
  // if (isAdminRoute) {
  //   if (!user) {
  //     const redirectUrl = new URL("/auth/login", request.url);
  //     redirectUrl.searchParams.set("redirect", pathname);
  //     return NextResponse.redirect(redirectUrl);
  //   }
  //   if (user.role !== "admin") {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  // }
  //
  // // Redirect authenticated users from auth routes
  // if (isAuthRoute && user) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }
  //
  // // Add user info to headers for use in server components
  // const response = NextResponse.next();
  // if (user) {
  //   response.headers.set("x-user-id", user.userId as string);
  //   response.headers.set("x-user-email", user.email as string);
  // }
  //
  // return response;

  // =============================================================================
  // DEMO MODE (remove this and uncomment above when ready)
  // =============================================================================
  console.log(`[Demo Middleware] Processing: ${pathname}`);

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/settings", "/profile"];
  const authRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"];
  const adminRoutes = ["/admin"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Demo: Check for demo auth cookie
  const isAuthenticated = request.cookies.has("demo-auth");
  const isAdmin = request.cookies.get("demo-role")?.value === "admin";

  if ((isProtectedRoute || isAdminRoute) && !isAuthenticated) {
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

/**
 * Middleware matcher configuration
 *
 * Matches all routes except:
 * - _next/static (static files)
 * - _next/image (image optimization)
 * - favicon.ico (favicon file)
 * - public files (images, etc.)
 * - API routes (if you want to handle auth separately)
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
