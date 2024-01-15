import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile GitHub: ", profile);

        let userRole = "GitHub User"; // Role for everybody but me
        if (profile?.email == "drewreynerwilliams@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_Secret,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "Google User"; // Role for everybody but me
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    }),
  ],
  callbacks: {
    // Adds our role to the token so we can use it in the app
    async jwt({ token, user }) {
      // Server-side
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      // Client-side
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
