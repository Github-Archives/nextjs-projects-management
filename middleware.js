// This middleware allows us to not have to protect our pages on each page with these authentication rules in one spot

// { withAuth } => Middleware that checks if the user is authenticated/authorized. If if they aren't, they will be redirected to the login page. Otherwise, continue.
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.role);

    // This logic will make the CreateUser page only accessible to role=admin
    //    otherwise kicked to Denied page even if logged in
    if (
      req.nextUrl.pathname.startsWith("/CreateUser") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
  },
  {
    // Authorized admin if they have a token & token != null
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

// Protects CreateUser from non-logged in users
export const config = { matcher: ["/CreateUser"] };
