import React from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  CardContent,
  KanbanContent,
  createDefaultKanbanContent,
} from "./model";
import { Column } from "./KBColumn";
import classes from "./kanban.module.css";
import { moveCard } from "./kanban.business";
import { mockData } from "./mock-data";

export const KanbanContainer: React.FC = () => {
  const [kanbanContent, setKanbanContent] = React.useState<KanbanContent>(
    createDefaultKanbanContent()
  );

  React.useEffect(() => {
    setKanbanContent(mockData);
  }, []);

  React.useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        // didn't drop on anything
        if (!location.current.dropTargets.length) {
          return;
        }
        // Dragging a card
        if (source.data.type === 'card') {
          const destination = location.current.dropTargets[0];
          // if released outside of any target
          if (!destination) {
            return;
          }
          const card = source.data.card as CardContent;
          const columnId = destination.data.columnId as string;
          const destinationCardId = destination.data.cardId as string;
          const closestEdge = destination.data.closestEdge as string;
          if (location.current.dropTargets.length === 1) {
            // Here too we make sure that we are working with the latest status.
            setKanbanContent((kanbanContent) =>
              moveCard(card, { columnId, cardId: destinationCardId, closestEdge }, kanbanContent)
            );
          }
          // dropping in a column (relative to a card)
          if (location.current.dropTargets.length === 2) {
          }

        }
      },
    });
  }, [kanbanContent]);

  return (
    <div className={classes.container + " grid"}>
      {kanbanContent.columns.map((column) => (
        <Column
          key={column.id}
          name={column.label}
          content={column.content}
          columnId={column.id}
        />
      ))}
    </div>
  );
};
