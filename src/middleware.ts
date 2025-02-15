import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (
      token &&
      (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // allow users to watch the videos
        if (pathname === "/" || pathname.startsWith("/auth/videos")) {
          return true;
        }

        // allow access to auth routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/sign-in") ||
          pathname.startsWith("/sign-up")
        ) {
          return true;
        }

        // Restrict uploads and dashboard/profile access to logged-in users
        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/profile") ||
          pathname.startsWith("/upload")
        ) {
          return !!token; // Only allow if token exists (user is authenticated)
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // Apply to all routes except static files and favicon
  ],
};
