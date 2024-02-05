import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import CheckIfLoggedIn from "../utils/authUtils/returnUserStatus";

const Nav = () => {
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex w-full items-center justify-between px-10 py-4">
        <div>My Project Management Site</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <Link href="/Board">Project Board</Link>
          <Link href="/CreateUser">Create User</Link>
          <Link href="/ClientMember">Client Member</Link>
          <Link href="/Member">Member</Link>
          <Link href="/Public">Public</Link>
          {/* Clerk Manage Account button */}
          <UserButton afterSignOutUrl="/" />
          {/* TODO: Fix temporary logged in status */}
          <CheckIfLoggedIn />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
