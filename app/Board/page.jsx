"use client";

// *Feb 26th 2024*
// ! This is the new video I'm going off of which is working so far, in that I have addable/deletable columns:
//@19:43-> https://www.youtube.com/watch?v=RG-3R6Pu_Ik&t=1s

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

import {
  DndContext,
  useDndMonitor,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  sortableKeyboardCoordinates,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "../(components)/Input/Input";
import PlusIcon from "../Icons/PlusIcon";

// Import SortableArea-Imports->CardColumn->TaskCard->Card
import { SortableArea } from "../(components)/SortableArea/SortableArea";
import ColumnContainer from "../(components)/ColumnContainer/ColumnContainer";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ATaskCard from "../(components)/ATaskCard/ATaskCard";

const Board = () => {
  // ! Debugging Code for dnd-kit methods
  // * Debugging: didn't work
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
  const [tasks, setTasks] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  console.log(columns);
  // console.log(JSON.stringify(columns, null, 2));

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

  // ? useMemo -> is a React hook that memorizes the output of a function and reuses it when the inputs haven't changed.
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  // ! Not using these underlined methods with new strategy
  const addCard = (title) => {
    // Takes in a String `title` parameter
    // Take current `cards` array & return a new array
    // Spread the old values of the `cards` &
    // Add a new object with the id: cards.length + 1
    // Add the `title` from the String passed in
    setCards((cards) => [
      ...cards,
      { id: cards.length + 1, title },
      // ! It will be more like below when I start updating all sections of Card via modal
      //   { id: cards.length + 1, title, description, content, footer },
    ]);
  };

  // Helper function that takes id of task, goes through the 'cards' array and finds where the id occurs
  const getCardPosition = (id) => cards.findIndex((card) => card.id === id);

  const cardHandleDragEnd = (event) => {
    console.log("onDragEnd", event);
    // active = element currently dragging
    // over = element which will be replaced, once we let go of the active element
    const { active, over } = event;
    // This means it's being let go at the same position it came from. If so do nothing
    if (active.id === over.id) {
      return;
      // Else: setCards = update the 'cards' array
    } else {
      setCards((cards) => {
        // Gets position of element before it was dragged
        const originalPosition = getCardPosition(active.id);
        // Gets the new position of the element, where it should be after the array is updated
        const newPosition = getCardPosition(over.id);
        // Here DND-Kit gives us a utility funciton that updates array based on original & new position
        // array to update, original pos, new pos
        return arrayMove(cards, originalPosition, newPosition);
      });
    }
  };

  // This is so DND-Kit works on Mobile and Keyboard
  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(TouchSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   }),
  // );

  // ! New from here starting at 38mins: https://www.youtube.com/watch?v=RG-3R6Pu_Ik&t=1s
  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      // if task.id is not the task we want return original task
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function generateId() {
    // Generate a random number between 0 and 10000
    return Math.floor(Math.random() * 10001);
  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    console.log(
      `Filtered Columns: ${JSON.stringify(filteredColumns, null, 2)}`,
    );
    setColumns(filteredColumns);

    // Delete tasks when column is deleted
    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  // Update card title
  function updateColumn(id, title) {
    console.log(`updateColumn: id=${id} title=${title}`);
    const newColumns = columns.map((col) => {
      if (col.id !== id) {
        return col;
      }
      return { ...col, title };
    });
    setColumns(newColumns);
  }

  function onDragStart(event) {
    console.log("onDragStart", event);
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
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // I'm dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // ! Fix introduced after video recording
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
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <div>
      <p className="text-4xl">Task Board</p>
      {/* Returns the closest rectangles from an array of rectangles to the center of a given..Whenever we drag an element into a certain area collisionDetection decides which area it should go towards when mouse is unclicked*/}
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        // collisionDetection={closestCenter}
        // announcements={defaultAnnouncements}
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
              <ATaskCard
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
