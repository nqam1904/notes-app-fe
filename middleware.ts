import { NextRequest, NextResponse } from "next/server";

// Block access to hidden files/directories (dotfiles) like /.env, /.git, etc.
// Allow the web standard path ".well-known" specifically.
const ALLOWED_DOT_SEGMENTS = new Set<string>([".well-known"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Deny path traversal attempts
  if (pathname.includes("..")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Deny any path segment that starts with a dot, except for allowed ones
  const segments = pathname.split("/").filter(Boolean);
  const hasBlockedDotSegment = segments.some((segment) => {
    if (!segment) return false;
    if (ALLOWED_DOT_SEGMENTS.has(segment)) return false;
    return segment.startsWith(".");
  });

  if (hasBlockedDotSegment) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

// Apply to all routes except Next.js internals and common public assets
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest).*)",
  ],
};
