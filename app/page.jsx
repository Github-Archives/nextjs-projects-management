import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      {/* Clerk Manage Account button */}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Home;
