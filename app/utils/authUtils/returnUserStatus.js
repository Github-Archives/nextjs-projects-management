"use server";

// ! This is a test file (delete after finished testing functionality)
// ? At the time I wanted a place-holder for the top-right avatar when user isn't logged in so spacing stays consistent

import { auth, currentUser } from "@clerk/nextjs";

export default async function CheckIfLoggedIn() {
  const user = await currentUser();

  // * Alternative current user output
  // const { userId } = auth();
  // return userId;
  // return user?.firstName;

  if (!user) {
    return <div>Not logged in</div>;
  }
  return <div>Hello {user?.firstName}</div>;
}
