import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // allow authorized routes.
        if (
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/sign-in") ||
          pathname.startsWith("/sign-up")
        ) {
          return true;
        }

        // public path
        if (pathname.startsWith("/") || pathname.startsWith("/api/videos")) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // Apply to all routes except static files and favicon
    "/dashboard/:path*", // Protect the dashboard and its sub-routes
    "/profile/:path*", // Protect profile pages
  ],
};
