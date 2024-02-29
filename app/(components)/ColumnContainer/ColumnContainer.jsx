import React from "react";

import { Button } from "@/components/ui/button";

import TrashIcon from "@/app/Icons/TrashIcon";
import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function ColumnContainer(props) {
  const { column, deleteColumn } = props;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-rose-500 opacity-40"
      >
        {" "}
      </div>
    );
  }

  return (
    <div
      className="bg-columnBackgroundColor flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md"
      ref={setNodeRef}
      style={style}
    >
      {/* Column title */}
      <div
        className="bg-mainBackgroundColor text-md border-columnBackgroundColor flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 p-3 font-bold"
        {...attributes}
        {...listeners}
      >
        <div className="flex gap-2">
          <div className="bg-columnBackgroundColor flex items-center justify-center rounded-full px-2 py-1 text-sm">
            0
          </div>
          {column.title}
        </div>
      </div>
      {/* <Button onClick={deleteColumn(column.id)}>Delete</Button> */}
      {/* <Button onClick={deleteColumn(column.id)}>Delete</Button> */}
      <Button onClick={() => deleteColumn(column.id)}>
        <TrashIcon />
        Delete
      </Button>
      {/* <button
        onClick={() => {
          deleteColumn(column.id);
        }}
        className="
        hover:bg-columnBackgroundColor
        rounded
        stroke-gray-500
        px-1
        py-2
        hover:stroke-white
        "
      >
        Delete
      </button> */}
      {/* Column task container */}
      <div className="flex flex-grow">Content</div>
      {/* Column footer */}
      <div>Footer</div>
    </div>
  );
}

export default ColumnContainer;
