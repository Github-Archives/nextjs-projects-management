// * Anything importing/nested/children in <SortableContext/> is now `draggable+droppable+sortable`
import { useState, useEffect } from "react";

import { CardColumn } from "../Column/CardColumn";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// todo: `title` is only temp for testing
export const SortableArea = ({ id, cards, title, cardtitle }) => {
  //   const [idHere, setIdHere] = useState();
  useEffect(() => {
    // console.log(`\n\tId: ${id}\n`);
    console.log(`\n\t▶ Title: ${title}\n`);
    console.log(`\n\t▶▶ Card Title: ${cardtitle}\n`);
    // console.log(`\n\titems/cards: ${cards}\n`);
  }, [id]);

  return (
    <SortableContext
      items={cards}
      strategy={verticalListSortingStrategy}
      id={id}
    >
      {/* Make CardColumn drag/drop/sortable */}
      <CardColumn id={id} cards={cards} />
    </SortableContext>
  );
};
