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
import { Input } from "../(components)/Input/Input";

// Import SortableArea-Imports->CardColumn->TaskCard->Card
import { CardColumn } from "../(components)/Column/CardColumn";
import { SortableArea } from "../(components)/SortableArea/SortableArea";

import { Button } from "@/components/ui/button";
import ColumnContainer from "../(components)/ColumnContainer/ColumnContainer";

import PlusIcon from "../Icons/PlusIcon";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Board = () => {
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

  // const [cards, setCards] = useState([
  //   {
  //     id: 1,
  //     title: "Card Title 1",
  //     description: "Card Description 1",
  //     content: "Card Content 1",
  //     footer: "Card Footer 1",
  //   },
  //   {
  //     id: 2,
  //     title: "Card Title 2",
  //     description: "Card Description 2",
  //     content: "Card Content 2",
  //     footer: "Card Footer 2",
  //   },
  //   {
  //     id: 3,
  //     title: "Card Title 3",
  //     description: "Card Description 3",
  //     content: "Card Content 3",
  //     footer: "Card Footer 3",
  //   },
  // ]);

  // const [columns, setColumns] = useState([
  //   {
  //     id: "column-1",
  //     title: "Column 1 ► |AAA|",
  //     cards: [
  //       // Initial cards for Column 1
  //       {
  //         id: 1,
  //         title: "•Title (1) ►[A][1]",
  //         description: "Card Description 1",
  //         content: "Card Content 1",
  //         footer: "Card Footer 1",
  //       },
  //       {
  //         id: 2,
  //         title: "•Title (2) ►[A][2]",
  //         description: "Card Description 2",
  //         content: "Card Content 2",
  //         footer: "Card Footer 2",
  //       },
  //       {
  //         id: 3,
  //         title: "•Title (3) ►[A][3]",
  //         description: "Card Description 3",
  //         content: "Card Content 3",
  //         footer: "Card Footer 3",
  //       },
  //       // ... Add more initial cards if needed
  //     ],
  //   },
  //   // ... Add more columns if needed
  //   {
  //     id: "column-2",
  //     title: "Column 2 ► |BBB|",
  //     cards: [
  //       // Initial cards for Column 2
  //       {
  //         id: 1,
  //         title: "••Title (1) ►[B][1]",
  //         description: "Card Description 1 Column 2",
  //         content: "Card Content 1 Column 2",
  //         footer: "Card Footer 1 Column 2",
  //       },
  //       {
  //         id: 2,
  //         title: "••Title (2) ►[B][2]",
  //         description: "Card Description 2 Column 2",
  //         content: "Card Content 2 Column 2",
  //         footer: "Card Footer 2 Column 2",
  //       },
  //       {
  //         id: 3,
  //         title: "••Title (3) ►[B][3]",
  //         description: "Card Description 3 Column 2",
  //         content: "Card Content 3 Column 2",
  //         footer: "Card Footer 3 Column 2",
  //       },
  //       // ... Add more initial cards if needed
  //     ],
  //   },
  // ]);

  const [columns, setColumns] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
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

  // ! New from here starting at 8mins: https://www.youtube.com/watch?v=RG-3R6Pu_Ik&t=1s
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
  }

  function onDragStart(event) {
    console.log("onDragStart", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event) {
    console.log("onDragEnd", event);
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId,
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId,
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  return (
    <div>
      <p className="text-4xl">Task Board</p>
      {/* Returns the closest rectangles from an array of rectangles to the center of a given..Whenever we drag an element into a certain area collisionDetection decides which area it should go towards when mouse is unclicked*/}
      {/* <button onClick={createNewColumn}>Create Column</button> */}
      {/* <button onClick={() => {
          createColumn()
        }}</button> */}
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        // collisionDetection={closestCenter}
        // onDragEnd={cardHandleDragEnd}

        // announcements={defaultAnnouncements}
      >
        {/* <Input onSubmit={addCard} /> */}

        <div className="m-auto flex gap-2">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
          </div>
          <Button onClick={createNewColumn}>
            <PlusIcon />
            Create Column
          </Button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>,
          document.body,
        )}

        {/* ! Another way to loop */}
        {/* {columns.map((column) => (
          <SortableArea key={column.id} id={column.id} cards={column.cards} />
        ))} */}
        {/* Monitor drag and drop events that happen on the parent `DndContext` provider */}

        {/* {columns.map((column) => (
          <div className="flex" key={column.id}>

            <div className="flex-shrink-0">
              <SortableArea
                id={column.id}
                title={column.title}
                cardtitle={
                  column.id === "column-1" ? column.cards[0]?.title : ""
                }
                cards={column.id === "column-1" ? column.cards : []}
              />
            </div>

            <div className="flex-shrink-0">
              <SortableArea
                id={column.id}
                title={column.title}
                cardtitle={
                  column.id === "column-2" ? column.cards[0]?.title : ""
                }
                cards={column.id === "column-2" ? column.cards : []}
              />
            </div>
          </div>
        ))} */}
      </DndContext>
    </div>
  );
};

export default Board;
