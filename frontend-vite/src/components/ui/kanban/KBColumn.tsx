import React from "react";
import classes from "./kanban.module.css";
import { CardContent } from "./model";
import { KBCard } from "./KBCard";
import { EmptySpaceDropZone } from "./EmptySpaceDropZone";

interface Props {
  columnId: number;
  name: string;
  content: CardContent[];
}

export const Column: React.FC<Props> = (props) => {
  const { columnId, name, content } = props;

  return (
      <div className={classes.column +" col-4"}>
        <h4>{name}</h4>
        {content.map((card) => (
          <KBCard key={card.id} content={card} columnId={columnId} />
        ))}
        <EmptySpaceDropZone columnId={columnId} />
      </div>
);
};
