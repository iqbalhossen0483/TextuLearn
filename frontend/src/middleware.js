import { NextResponse } from "next/server";

// Define public paths that do not require authentication
const PUBLIC_PATHS = ["/", "/books", "/login", "/register"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("authToken")?.value;

  // Allow requests for Next.js internals, static assets, and API routes to pass through
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/public/") ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  const isPublicPath = PUBLIC_PATHS.some((path) => {
    if (path.endsWith("*")) {
      return pathname.startsWith(path.slice(0, -1));
    }
    return pathname === path;
  });

  // If the path is public, allow access
  if (isPublicPath) {
    // If user is authenticated and tries to access login/register, redirect to home or a dashboard
    if (authToken && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // If the path is private and there's no auth token, redirect to login
  if (!authToken) {
    // Preserve the intended destination for redirection after login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If the path is private and user is authenticated, allow access
  return NextResponse.next();
}

// Configure the middleware to run on specific paths or all paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (static assets in public folder if served directly)
     * This ensures the middleware runs on page navigations.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|banner-elustator.png|book_thumbnail.jpg|mascot.png).*)",
  ],
};
