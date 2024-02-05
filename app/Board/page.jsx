"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserIcon from "../SVG/UserIcon";
import CalendarIcon from "../SVG/CalendarIcon";
import CheckIcon from "../SVG/CheckIcon";

import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

const Board = () => {
  return (
    <div>
      <p className="text-4xl">Task Board</p>
      {/* requires you to be able to attach listeners and a ref to the DOM element that you would like to become draggable. You'll also need to provide a unique id attribute to all your draggable components.  */}
      <DndContext>
        <Draggable>
          <Droppable>
            <div>Drag Me!</div>
          </Droppable>
        </Draggable>

        {/* Needs attached listeners & ref & id attribute */}
        <Card>
          <CardHeader>
            <CardTitle>CARD TITLE</CardTitle>
            <CardDescription>
              CARD DESCRIPTION: All individual card editing options (including
              deleting this card) are all accessible via inside this card.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>CARD CONTENT:</p>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm">Assignee: John Doe</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm">Due Date: February 20, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm">Status: In Progress</span>
            </div>
          </CardContent>
          <CardFooter>CARD FOOTER</CardFooter>
        </Card>
        {/* <Draggable /> */}
        {/* <Droppable /> */}
      </DndContext>
    </div>
  );
};

export default Board;
