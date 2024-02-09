import * as React from "react";

import { cn } from "@/lib/utils";

import { DndContext } from "@dnd-kit/core";
import { Draggable } from "../../app/Board/Draggable";
import { Droppable } from "../../app/Board/Droppable";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  // requires you to be able to attach listeners and a ref to the DOM element that you would like to become draggable. You'll also need to provide a unique id attribute to all your draggable components.
  // Needs attached listeners & ref & id attribute

  <DndContext>
    <Draggable>
      <Droppable>
        <div
          ref={ref}
          // w-[250px] added to decrease card width
          className={cn(
            "w-[250px] rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
            className,
          )}
          {...props}
        />
      </Droppable>
    </Draggable>
  </DndContext>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
