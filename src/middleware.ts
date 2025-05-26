import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicPaths = ["/sign-in", "/sign-up", "/verify-code", "/"];

export default withAuth(
  async function middleware(request) {
    const token = await getToken({ req: request });

    const url = request.nextUrl;

    if (token && publicPaths.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        const url = req.nextUrl;

        if (publicPaths.includes(url.pathname)) {
          return true;
        }

        return !!token;
      },
    },
    pages: {
      signIn: "/sign-in",
    },
  }
);

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/dashboard/:path*",
    "/verify-code/:path*",
  ],
};
