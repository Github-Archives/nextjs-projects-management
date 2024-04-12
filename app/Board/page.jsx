"use client";

import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  closestCenter, // todo: confirm if this is needed
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  sortableKeyboardCoordinates,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import PlusIcon from "../Icons/PlusIcon";
import ColumnContainer from "../components/ColumnContainer";
import TaskCard from "../components/TaskCard";

const Board = () => {
  // * Debugging functions for dnd-kit methods (currently not used)
  const defaultAnnouncements = {
    onDragStart(id) {
      console.log(`Picked up draggable item ${id}.`);
    },
    onDragOver(id, overId) {
      if (overId) {
        console.log(
          `Draggable item ${id} was moved over droppable area ${overId}.`,
        );
        return;
      }
      console.log(`Draggable item ${id} is no longer over a droppable area.`);
    },
    onDragEnd(id, overId) {
      if (overId) {
        console.log(
          `Draggable item ${id} was dropped over droppable area ${overId}`,
        );
        return;
      }
      console.log(`Draggable item ${id} was dropped.`);
    },
    onDragCancel(id) {
      console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
    },
  };

  const [columns, setColumns] = useState([]);
  const [columnKey, setColumnKey] = useState(0);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [taskKey, setTaskKey] = useState(0);

  // ! ...............
  const [projectName, setProjectName] = useState("NPM");
  const [taskName, setTaskName] = useState(0);
  const [taskSummary, setTaskSummary] = useState("Default Task Summary");
  const [taskType, setTaskType] = useState("Story");
  const [taskStatus, setTasketStatus] = useState("To Do");
  const [taskDescription, setTaskDescription] = useState("Task");
  const [taskStoryPoints, setTaskStoryPoints] = useState(0);
  // ! ........................

  // console.log(columns);

  // This is so DND-Kit works on Mobile and Keyboard
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // * useMemo -> is a React hook that memorizes the output of a function and reuses it when the inputs haven't changed.
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  // Generate random number between 0-10000 for each new Column and Task id
  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  // $#$$#$$#$$#$$#$$#$$#$$#$$#$$# useEffect(() => {}) #$$#$$#$$#$$#$$#$$#$$#$$#$  //
  useEffect(() => {
    console.log(`activeTask: ${JSON.stringify(activeTask, null, 2)}`);
  }, [activeTask]);
  // $#$$#$$#$$#$$#$$#$$#$$#$$#$$# useEffect(() => {}) #$$#$$#$$#$$#$$#$$#$$#$$#$  //

  // *#**#**#**#**#**#**#**#**#**# TASK #**#**#**#**#**#**#**#**#*  //
  // ! Notice we have newly setup all of these properties for the task in createTask() but we are not doing anything with them yet. Specifically in updateTask() we are only updating taskContent.
  function createTask(columnId) {
    const currentTaskKey = taskKey + 1;
    setTaskKey(currentTaskKey);
    const newTask = {
      key: currentTaskKey,
      id: generateId(),
      columnId,
      taskContent: `Task (${currentTaskKey})`,
      taskName: `${projectName}-${currentTaskKey}`,
      taskSummary: `${taskSummary}`,
      taskType: `${taskType}`,
      taskStatus: `${taskStatus}`,
      taskDescription: `${taskDescription}`,
      taskStoryPoints: `${taskStoryPoints}`,
    };
    setTasks([...tasks, newTask]);
  }

  // ! `taskContent` is only one single prop! We need this function to do more with every prop it could receive!!
  function updateTask(id, taskContent) {
    const newTasks = tasks.map((task) => {
      // If task.id is not the task we want return original task
      if (task.id !== id) {
        return task;
      }
      return { ...task, taskContent };
    });
    setTasks(newTasks);
    console.log(`Updated Tasks: ${JSON.stringify(newTasks, null, 2)}`);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    // console.log(`Filtered Tasks: ${JSON.stringify(newTasks, null, 2)}`);
    setTasks(newTasks);
  }
  // *#**#**#**#**#**#**#**#**#**# TASK #**#**#**#**#**#**#**#**#*  //

  // *--*--*--*--*--*--*--*--*--* COLUMN *--*--*--*--*--*--*--*--* //
  function createNewColumn() {
    const currentColumnKey = columnKey + 1;
    setColumnKey(currentColumnKey);
    const columnToAdd = {
      key: currentColumnKey,
      id: generateId(),
      title: `Column ${currentColumnKey}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    // console.log(
    //   `Filtered Columns: ${JSON.stringify(filteredColumns, null, 2)}`,
    // );
    setColumns(filteredColumns);

    // Delete tasks when column is deleted
    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  // Update Card title
  function updateColumn(id, title) {
    // console.log(`updateColumn: id=${id} title=${title}`);
    const newColumns = columns.map((col) => {
      if (col.id !== id) {
        return col;
      }
      return { ...col, title };
    });
    setColumns(newColumns);
  }
  // *--*--*--*--*--*--*--*--*--* COLUMN *--*--*--*--*--*--*--*--* //

  function onDragStart(event) {
    // console.log("onDragStart", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) {
      return;
    }

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) {
      return;
    }
    // console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      return;
    }

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) {
      return;
    }

    // I'm dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // I'm dropping a Task over a Column
    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        // console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <div>
      <p className="text-4xl">Task Board</p>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        // collisionDetection={closestCenter}
        // announcements={defaultAnnouncements} // todo: Get working
      >
        {/* Column */}
        <div className="m-auto flex gap-2">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <Button onClick={createNewColumn}>
            <PlusIcon />
            Create Column
          </Button>
        </div>

        {/* !! POTENTIAL FUTURE IMPROVEMENT: Create a <DragOverlay> for each component..
        This new component might be called <ColumnDragOverlay> that does not require all of the properties that our <ColumnContainer> requires because the DragOverlay is not interactive. For example: deleteColumn,updateColumn,createTask,deleteTask,updateTask are not required. I believe because you don't need to use these properties while the component is in the middle of being dragged.
      */}
        {/* Overlay of ColumnContainer while being dragged */}
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id,
                )}
              />
            )}
            {activeTask && (
              // I wonder how important it is to include every single <TaskCard> property here when it's just being dragged... not edited.
              <TaskCard
                key={activeTask.id}
                task={activeTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default Board;
