import Link from "next/link";

const Nav = () => {
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex w-full items-center justify-between px-10 py-4">
        <div>My Project Management Site</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <Link href="/CreateUser">Create User</Link>
          <Link href="/ClientMember">Client Member</Link>
          <Link href="/Member">Member</Link>
          <Link href="/Public">Public</Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
