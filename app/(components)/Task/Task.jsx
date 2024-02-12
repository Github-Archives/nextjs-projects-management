import React from "react";
import "./Task.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Task = ({ id, title }) => {
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
      className="task"
    >
      <input type="checkbox" className="checkbox" />
      {title}
    </div>
  );
};
