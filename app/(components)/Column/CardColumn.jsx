// "use client";

import "./CardColumn.css";
import { TaskCard } from "../TaskCard/TaskCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const CardColumn = ({ cards }) => {
  return (
    <div className="column">
      {/* Need to tell SortableContext which items to keep track of as well as strategy for sorting elements. Note: there's also horizontalListSortingStrategy*/}
      <SortableContext items={cards} strategy={verticalListSortingStrategy}>
        {cards.map((card) => (
          <div key={card.id}>
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
      </SortableContext>
    </div>
  );
};
