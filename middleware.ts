import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply security checks to specific sensitive paths
  // This is a whitelist approach - only block known bad patterns

  // 1. Block path traversal attempts
  if (pathname.includes("..")) {
    console.warn("[Middleware] Blocked path traversal attempt:", pathname);
    return new NextResponse("Not Found", { status: 404 });
  }

  const segments = pathname.split("/").filter(Boolean);
  const hasBlockedDotSegment = segments.some((segment) => {
    if (!segment) return false;
    return segment.startsWith(".");
  });

  if (hasBlockedDotSegment) {
    console.warn("[Middleware] Blocked dotfile access attempt:", pathname);
    return new NextResponse("Not Found", { status: 404 });
  }

  // Allow everything else
  return NextResponse.next();
}

// Only apply middleware to paths that could be security risks
// Exclude Next.js internals, API routes, and common assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next (Next.js internals)
     * - api (API routes - if you have them)
     * - Common file extensions
     */
    "/((?!_next|api)(?!.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|woff|woff2|ttf|eot|otf|css|js|json|xml|txt|pdf)).*)",
  ],
};
