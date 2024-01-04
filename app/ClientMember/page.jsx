"use client"; // without this it's server rendered by default

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Member = async () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });
  return (
    <div>
      <h1>Member Client Session</h1>
      <h2>
        Demonstration of getting authentication to work on client-side (less
        preferable)
      </h2>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default Member;
