import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  return (
    <div>
      <p className="text-4xl">Welcome Page</p>
      {/* ! temp location */}
      <Card>
        <CardHeader>
          <CardTitle>CARD TITLE</CardTitle>
          <CardDescription>
            CARD DESCRIPTION: All individual card editing options (including
            deleting this card) are all accessible via inside this card.
          </CardDescription>
        </CardHeader>
        <CardContent className="truncate">
          <p>CARD CONTENT:</p>https://ui.shadcn.com/docs/components/card#usage
        </CardContent>
        <CardFooter>CARD FOOTER</CardFooter>
      </Card>
      {/* ! temp */}
      <h1>Home</h1>
      {/* Clerk Manage Account button */}
      {/* TODO: Move <UserButton/> to <Navbar/> */}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Home;
