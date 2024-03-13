// "use client";

import "./CardColumn.css";
import { TaskCard } from "../TaskCard/TaskCard";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// * Rename to SortableCardColumn ?
export const CardColumn = ({ id, cards }) => {
  return (
    <div className="column">
      {/* Need to tell SortableContext which items to keep track of as well as strategy for sorting elements.
          For multiple columns/containers we need multiple <SortableContext/>'s */}

      {/*
      ! NEW NOTE ! Multiple-Container Columns means I need Multiple <SortableContext /> components. One for each column.
      HOWEVER, I THINK I NEED TO "LIFT UP" <SortableContext/> out of this <CardColumn/> component since the entire sortable area can be multiple <CardColumn/>'s.

      (`id` prop was also added)
      */}

      {cards.map((card) => (
        <div className={`card-${card.id}`} key={card.id}>
          <TaskCard
            id={card.id}
            title={card.title}
            description={card.description}
            content={card.content}
            footer={card.footer}
            key={card.id}
          />
        </div>
      ))}
    </div>
  );
};
