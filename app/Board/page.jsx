import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Board = () => {
  return (
    <div>
      <p className="text-4xl">Task Board</p>
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
    </div>
  );
};

export default Board;
