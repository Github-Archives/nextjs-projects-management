"use client";

import { useState } from "react";

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

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  sortableKeyboardCoordinates,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column } from "../(components)/Column/Column";
import { Input } from "../(components)/Input/Input";

const Board = () => {
  // ? I Want Cards to replace these `tasks`
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fix styling in about section" },
    { id: 3, title: "Learn how to center a div" },
  ]);

  // ! Card Remake (Task)
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
      content: "Content 1",
      footer: "Footer 1",
    },
    {
      id: 2,
      title: "Title 2",
      description: "Description 2",
      content: "Content 2",
      footer: "Footer 2",
    },
    {
      id: 3,
      title: "Title 3",
      description: "Description 3",
      content: "Content 3",
      footer: "Footer 3",
    },
  ]);

  // Add tasks
  const addTask = (title) => {
    // Takes in `title` parameter as a String
    // Take current `tasks` array & return a new array
    // Spread the old values of the `tasks` &
    // Add a new object with the id: tasks.length + 1
    // Add the `title` from the String passed in
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  };

  // ! Card Remake (Add Task)
  const addCard = (title) => {
    setCards((cards) => [
      ...cards,
      { id: cards.length + 1, title, description, content, footer },
    ]);
  };

  // Helper function that takes id of task, goes through the 'tasks' array and finds where the id occurs
  const getTaskPosition = (id) => tasks.findIndex((task) => task.id === id);

  // ! Card Remake (getTaskPosition)
  const getCardPosition = (id) => cards.findIndex((card) => card.id === id);

  const handleDragEnd = (event) => {
    console.log("onDragEnd", event);
    // active = element currently dragging
    // over = element which will be replaced, once we let go of the active element
    const { active, over } = event;
    // This means it's being let go at the same position it came from. If so do nothing
    if (active.id === over.id) {
      return;
      // Else: setTasks = update the 'tasks' array
    } else {
      setTasks((tasks) => {
        // Gets position of element before it was dragged
        const originalPosition = getTaskPosition(active.id);
        // Gets the new position of the element, where it should be after the array is updated
        const newPosition = getTaskPosition(over.id);
        // Here DND-Kit gives us a utility funciton that updates array based on original & new position
        // array to update, original pos, new pos
        return arrayMove(tasks, originalPosition, newPosition);
      });
    }
  };

  // ! Card Remake (handleDragEnd)
  const cardHandleDragEnd = (event) => {
    console.log("onDragEnd", event);
    // active = element currently dragging
    // over = element which will be replaced, once we let go of the active element
    const { active, over } = event;
    // This means it's being let go at the same position it came from. If so do nothing
    if (active.id === over.id) {
      return;
      // Else: setTasks = update the 'tasks' array
    } else {
      setCards((cards) => {
        // Gets position of element before it was dragged
        const originalPosition = getCardPosition(active.id);
        // Gets the new position of the element, where it should be after the array is updated
        const newPosition = getCardPosition(over.id);
        // Here DND-Kit gives us a utility funciton that updates array based on original & new position
        // array to update, original pos, new pos
        return arrayMove(cards, originalPosition, newPosition);
      });
    }
  };

  // This is so DND-Kit works on Mobile and Keyboard
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // ! Card Remake (sensors)
  // * SAME SAME

  return (
    <div>
      <p className="text-4xl">Task Board</p>
      {/* <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      > */}
      <Card>
        <CardHeader>
          <CardTitle>CARD TITLE</CardTitle>
          <CardDescription>
            CARD DESCRIPTION: All individual card editing options (including
            deleting this card) are all accessible via inside this card.
          </CardDescription>
        </CardHeader>
        {/* <CardContent>
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
          <CardFooter>CARD FOOTER</CardFooter> */}
      </Card>

      {/* Returns the closest rectangles from an array of rectangles to the center of a given..Whenever we drag an element into a certain area collisionDetection decides which area it should go towards when mouse is unclicked*/}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Input onSubmit={addTask} />
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
};

export default Board;
