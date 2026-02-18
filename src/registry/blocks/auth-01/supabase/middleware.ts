/**
 * Supabase Auth Middleware Example
 *
 * This middleware protects routes by checking for valid Supabase sessions.
 * Copy this to your `src/middleware.ts` file.
 *
 * @example
 * // middleware.ts (at project root or src/)
 * export { middleware, config } from "@/components/auth-01/supabase/middleware"
 *
 * // Or customize the config:
 * export { middleware } from "@/components/auth-01/supabase/middleware"
 * export const config = {
 *   matcher: ["/dashboard/:path*", "/settings/:path*"],
 * }
 */

import { type NextRequest, NextResponse } from "next/server";

// =============================================================================
// SUPABASE MIDDLEWARE IMPLEMENTATION
// =============================================================================

/**
 * Create Supabase server client for middleware
 * This handles cookie management for server-side auth
 */
// import { createServerClient } from "@supabase/ssr";
//
// function createClient(request: NextRequest) {
//   let response = NextResponse.next({
//     request: {
//       headers: request.headers,
//     },
//   });
//
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             request.cookies.set(name, value);
//             response = NextResponse.next({
//               request: {
//                 headers: request.headers,
//               },
//             });
//             response.cookies.set(name, value, options);
//           });
//         },
//       },
//     }
//   );
//
//   return { supabase, response };
// }

/**
 * Middleware function to protect routes
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // =============================================================================
  // SUPABASE IMPLEMENTATION (uncomment when ready)
  // =============================================================================
  // const { supabase, response } = createClient(request);
  //
  // // Refresh session if expired
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  //
  // // Define protected routes
  // const protectedRoutes = ["/dashboard", "/settings", "/profile"];
  // const authRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"];
  //
  // const isProtectedRoute = protectedRoutes.some((route) =>
  //   pathname.startsWith(route)
  // );
  // const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  //
  // // Redirect unauthenticated users from protected routes
  // if (isProtectedRoute && !user) {
  //   const redirectUrl = new URL("/auth/login", request.url);
  //   redirectUrl.searchParams.set("redirect", pathname);
  //   return NextResponse.redirect(redirectUrl);
  // }
  //
  // // Redirect authenticated users from auth routes
  // if (isAuthRoute && user) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
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

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Demo: Check for demo auth cookie
  const isAuthenticated = request.cookies.has("demo-auth");

  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
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
