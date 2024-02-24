"use client";

import { useState } from "react";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  sortableKeyboardCoordinates,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Input } from "../(components)/Input/Input";

// Import CardColumn which Imports CardTask
import { CardColumn } from "../(components)/Column/CardColumn";
import { SortableArea } from "../(components)/SortableArea/SortableArea";

const Board = () => {
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

  const [columns, setColumns] = useState([
    {
      id: "column-1",
      title: "Column 1 ► |AAA|",
      cards: [
        // Initial cards for Column 1
        {
          id: 1,
          title: " 🫥 Card Title 1 ► [A] 🫥 ",
          description: "Card Description 1",
          content: "Card Content 1",
          footer: "Card Footer 1",
        },
        {
          id: 2,
          title: " 🫥 Card Title 2 ► [A] 🫥 ",
          description: "Card Description 2",
          content: "Card Content 2",
          footer: "Card Footer 2",
        },
        {
          id: 3,
          title: " 🫥 Card Title 3 ► [A] 🫥 ",
          description: "Card Description 3",
          content: "Card Content 3",
          footer: "Card Footer 3",
        },
        // ... Add more initial cards if needed
      ],
    },
    // ... Add more columns if needed
    {
      id: "column-2",
      title: "Column 2 ► |BBB|",
      cards: [
        // Initial cards for Column 2
        {
          id: 1,
          title: " 🫥 Card Title 1 Column 2 ► [B] 🫥 ",
          description: "Card Description 1 Column 2",
          content: "Card Content 1 Column 2",
          footer: "Card Footer 1 Column 2",
        },
        {
          id: 2,
          title: " 🫥 Card Title 2 Column 2 ► [B] 🫥 ",
          description: "Card Description 2 Column 2",
          content: "Card Content 2 Column 2",
          footer: "Card Footer 2 Column 2",
        },
        {
          id: 3,
          title: " 🫥 Card Title 3 Column 2 ► [B] 🫥 ",
          description: "Card Description 3 Column 2",
          content: "Card Content 3 Column 2",
          footer: "Card Footer 3 Column 2",
        },
        // ... Add more initial cards if needed
      ],
    },
  ]);

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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div>
      <p className="text-4xl">Task Board</p>
      {/* Returns the closest rectangles from an array of rectangles to the center of a given..Whenever we drag an element into a certain area collisionDetection decides which area it should go towards when mouse is unclicked*/}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={cardHandleDragEnd}
      >
        <Input onSubmit={addCard} />
        {/* <SortableArea cards={cards} /> */}
        {/* <SortableArea cards={columns.cards} /> */}
        {/* <CardColumn cards={cards} /> */}
        {columns.map((column) => (
          <div className="flex" key={column.id}>
            {/* Column A */}
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
            {/* Column B */}
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
        ))}
        {/* Render columns dynamically */}
        {/* {columns.map((column) => (
          <CardColumn key={column.id} id={column.id} cards={column.cards} />
        ))} */}
      </DndContext>
    </div>
  );
};

export default Board;
