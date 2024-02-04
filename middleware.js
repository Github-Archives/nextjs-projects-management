import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

// ***********************************************************
// * * Here you can effect which routes require login to visit. Just add the route to the `publicRoutes` array. Also helpful for debugging without constant login reminders

// * Default: Empty array => all routes require Login
// export default authMiddleware({});
// * Routes: '/' and 'Public' do not require Login like this
export default authMiddleware({ publicRoutes: ["/", "/Public"] });

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
