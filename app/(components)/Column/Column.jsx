// "use client";
import React from "react";

import "./Column.css";
import { Task } from "../Task/Task";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const Column = ({ tasks }) => {
  return (
    <div className="column">
      {/* Need to tell SortableContext which items to keep track of as well as strategy for sorting elements. Note: there's also horizontalListSortingStrategy*/}
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <div key={task.id}>
            <Task id={task.id} title={task.title} key={task.id} />
          </div>
        ))}
      </SortableContext>
    </div>
  );
};
