import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

const Member = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }
  return (
    <div>
      <h1>Member Server Session</h1>
      <h2>
        Demonstration of getting authentication to work on server-side (more
        preferable)
      </h2>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default Member;
