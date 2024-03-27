import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DialogModal from "./DialogModal";
import TrashIcon from "@/app/Icons/TrashIcon";
import PropTypes from "prop-types";

function TaskCard({ task, deleteTask, updateTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Make tasks sortable
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    // ? See what happens if you get rid of these New destructured props like key, taskSummary, taskType, taskStatus, etc.
    key: task.id, // ! .........
    id: task.id,
    taskSummary: task.taskSummary, // ! .........
    taskType: task.taskType, // ! .........
    taskStatus: task.taskStatus, // ! .........
    taskDescription: task.taskDescription, // ! .........
    taskStoryPoints: task.taskStoryPoints, // ! .........
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

  const handleTaskClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
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

  // * We probably won't need editMode here if editing will happen in <DialogModal>
  // Returned when IN EDIT MODE
  if (editMode) {
    return (
      <div
        className="task-editable relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-blue-900 p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {/* I think <textarea/> needs to move to DialogModal.jsx*/}
        <textarea
          className="text-area h-[90%] w-full resize-none rounded border-none bg-transparent text-white focus:outline-none"
          value={task.taskDescription}
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
    <>
      <div
        className="task-static relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-red-800 p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={handleTaskClick}
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
      >
        <p className="task-content my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task.taskDescription}
        </p>
        {mouseIsOver && (
          <button
            className="delete-task-button top-1/2-translate-y-1/2 absolute right-4 rounded bg-columnBackgroundColor stroke-white p-2 opacity-60 hover:opacity-100"
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            <TrashIcon />
          </button>
        )}
      </div>
      {/* This works for now */}
      <DialogModal
        task={task}
        deleteTask={deleteTask}
        updateTask={updateTask}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
    </>
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
