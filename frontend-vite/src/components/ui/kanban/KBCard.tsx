import React, { useEffect, useRef, useState } from "react";
import { CardContent } from "./model";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import invariant from "tiny-invariant";
import { Card } from "primereact/card";
import { GhostCard } from "./ghost-card";
import { getClosestEdge } from "./kanban.business";

type State =
  | { type: 'idle' }
  | { type: 'dragging' };

interface Props {
  columnId: number;
  content: CardContent;
}

export const KBCard: React.FC<Props> = (props) => {
  const { content, columnId } = props;
  const [dragState, setDragState] = useState<State>({ type: 'idle' });
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [closestEdge, setClosestEdge] = useState<string | null>(null);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    // Add this to avoid typescript in strict mode complaining about null
    // on draggable({ element: el }); call
    invariant(element);

    return combine(
      draggable({
        element: element,
        getInitialData: () => ({ type: 'card', card: content }),
        onDragStart: () => setDragState({ type: 'dragging' }),
        onDrop: () => setDragState({ type: 'idle' }),
      }),
      dropTargetForElements({
        element: element,
        canDrop: ({ source }) => {return source.data.card.id !== content.id && source.data.type === 'card';},
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = { type: 'card', columnId, cardId: content.id, closestEdge: getClosestEdge(element, input, "vertical") };
          return data;
        },
        //      onDragEnter: () => { setIsDraggedOver(true) },
        //      onDragLeave: () => { setIsDraggedOver(false) },
        //      onDrop: () => {  setIsDraggedOver(false) },
        onDragEnter: (args) => { setClosestEdge(args.self.data.closestEdge); setIsDraggedOver(true) },
        onDrag: (args) => { setClosestEdge(args.self.data.closestEdge); },
        onDragLeave: () => { setClosestEdge(null); setIsDraggedOver(false) },
        onDrop: () => { setClosestEdge(null); setIsDraggedOver(false) },
      }));

  }, []);

  return (
    <>
      {closestEdge === 'top' && <GhostCard />}
      <Card ref={ref} title={content.title} style={{
        width: "100%",
        opacity: dragState.type === 'dragging' ? 0.4 : 1,
        background: isDraggedOver ? "lightblue" : "white",
      }}>
        {content.description}
      </Card>
      {closestEdge === 'bottom' && <GhostCard />}

    </>
  );
};
