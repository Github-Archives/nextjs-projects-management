import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TrashIcon from "@/app/Icons/TrashIcon";
import PropTypes from "prop-types";

function TaskCard({ task, deleteTask, updateTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Make tasks sortable
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode, // Disable Drag+Drop when editing Card Title
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  // Returns TaskCard slot where being dragged from, then dragged to
  if (isDragging) {
    return (
      <div
        className="task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-rose-500 bg-green-600 p-2.5 text-left opacity-50"
        ref={setNodeRef}
        style={style}
      />
    );
  }

  // Returned when IN EDIT MODE
  if (editMode) {
    return (
      <div
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-blue-900 p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <textarea
          className="h-[90%] w-full resize-none rounded border-none bg-transparent text-white focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Task content here. Press Shift+Enter to Submit"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  // This is returned when NOT IN EDIT MODE (Standard)
  return (
    <div
      className="task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-red-800 p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          className="top-1/2-translate-y-1/2 absolute right-4 rounded bg-columnBackgroundColor stroke-white p-2 opacity-60 hover:opacity-100"
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  }),
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};
