// * Anything importing/nested/children in <SortableContext/> is now `draggable+droppable+sortable`
import { useState, useEffect } from "react";

import { CardColumn } from "../Column/CardColumn";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDndMonitor } from "@dnd-kit/core";

// todo: `title` is only temp for testing
export const SortableArea = ({ key, id, title, cardtitle, cards }) => {
  // function Component() {
  //   // Monitor drag and drop events that happen on the parent `DndContext` provider
  //   useDndMonitor({
  //     onDragStart(event) {},
  //     onDragMove(event) {},
  //     onDragOver(event) {},
  //     onDragEnd(event) {},
  //     onDragCancel(event) {},
  //   });
  // }
  //   const [idHere, setIdHere] = useState();
  useEffect(() => {
    // console.log(`\n\tId: ${id}\n`);
    console.log(`\n\t▶ Title: ${title}\n`);
    console.log(`\n\t▶▶ Card Title: ${cardtitle}\n`);
    // console.log(`\n\titems/cards: ${cards}\n`);
  }, [id]);

  return (
    <SortableContext
      id={id}
      items={cards}
      strategy={verticalListSortingStrategy}
    >
      {/* <Component /> */}
      {/* Make CardColumn drag/drop/sortable */}
      <CardColumn id={id} cards={cards} />
    </SortableContext>
  );
};
