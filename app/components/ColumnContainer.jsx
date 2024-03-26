import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import PlusIcon from "@/app/Icons/PlusIcon";
import TrashIcon from "@/app/Icons/TrashIcon";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import PropTypes from "prop-types";

function ColumnContainer(props) {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

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
    disabled: editMode, // Disable Drag+Drop when editing Card Title
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
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-rose-500 bg-columnBackgroundColor opacity-40"
      >
        {" "}
      </div>
    );
  }

  return (
    <div
      className="flex h-[500px] max-h-[500px] w-[350px] touch-none flex-col rounded-md bg-columnBackgroundColor"
      ref={setNodeRef}
      style={style}
    >
      {/*
      ! STYLE IDEA: Make the boxes have a -> COOL ROUNDED-GRADIENT BORDER LIKE THIS: 
      <div class="border-5 border-transparent rounded-10 bg-gradient-to-tr from-white to-white, bg-gradient-315 from-purple-700 via-red-500 to-yellow-400"></div>
      */}

      {/* Column title */}
      <div
        className="text-md flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 border-columnBackgroundColor bg-mainBackgroundColor p-3 font-bold"
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
      >
        <div className="flex gap-2">
          <div className="flex items-center justify-center rounded-full bg-columnBackgroundColor px-2 py-1 text-sm">
            0
          </div>

          {/* TODO: I think I want all card editing, maybe excluding the title, to be done in the card's modal that expands when clicking on the card */}
          {!editMode && column.title}

          {editMode && (
            <input
              className="rounded border bg-black px-2 outline-none focus:border-rose-500"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") {
                  return;
                }
                setEditMode(false);
              }}
            />
          )}
        </div>
      </div>
      <Button
        className="delete-column-button hover:ring-2 hover:ring-inset hover:ring-rose-500"
        onClick={() => deleteColumn(column.id)}
      >
        <TrashIcon />
        Delete
      </Button>
      {/* Column task container */}
      <div className="column-container flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Add Task Button */}
      <Button
        className="add-task-button flex items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Add task
      </Button>
    </div>
  );
}

export default ColumnContainer;

ColumnContainer.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  deleteColumn: PropTypes.func.isRequired,
  updateColumn: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};
