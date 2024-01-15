// This file is only needed if we want to do authentication on the Client-side
//    we already have authentication working Server-side, which is prefered
"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
