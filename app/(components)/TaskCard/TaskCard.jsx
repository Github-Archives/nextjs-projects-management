// "use client";

import React from "react";
import "./TaskCard.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import UserIcon from "../../SVG/UserIcon";
import CalendarIcon from "../../SVG/CalendarIcon";
import CheckIcon from "../../SVG/CheckIcon";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const TaskCard = ({ id, title, description, content, footer }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // * Look at DND-Kit Tips: I believe this is where -> Converting the `transform` object to a string can feel tedious. Fear not, you can avoid having to do this by hand by importing the `CSS` utility from the `@dnd-kit/utilities` package:
  // This should be within your component that receives `transform` from `useDraggable`:
  // 'style' Controls what the element looks like while dragging it
  const style = {
    transition, // <- from youtube tutorial
    transform: CSS.Transform.toString(transform), // <- from youtube tutorial
    // transform: CSS.Translate.toString(transform), // <- from notes/official tips
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="card"
    >
      <Card>
        <CardHeader>
          {/* Checkbox shows that state is remembered after shuffle */}
          {/* <input type="checkbox" className="checkbox" /> */}
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
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
        <CardFooter>{footer}</CardFooter>
      </Card>
    </div>
  );
};
