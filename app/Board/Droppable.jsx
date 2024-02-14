// ! Currently Unused

// "use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

// Added 'export'
export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
