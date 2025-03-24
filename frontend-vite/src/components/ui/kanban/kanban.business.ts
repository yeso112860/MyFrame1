import { Position } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { CardContent, Column, KanbanContent } from "./model";
import { produce } from "immer";

// This could be made more optimal

const removeCardFromColumn = (card: CardContent, kanbanContent: KanbanContent): KanbanContent => {
  const newColumns = kanbanContent.columns.map((column) => {
    const newContent = column.content.filter((c) => c.id !== card.id);

    return {
      ...column,
      content: newContent,
    };
  });

  return {
    ...kanbanContent,
    columns: newColumns,
  };
};

const dropCard = (origincard: CardContent, destinationCardId: string, destinationColumn: Column, closestEdge: string): Column => {
  return produce(destinationColumn, (draft) => {
    let index = draft.content.findIndex(
      (card) => card.id === destinationCardId
    );
    if (index === -1)
      draft.content.push(origincard);
    else{
      if (closestEdge === 'bottom') index++;
      draft.content.splice(index, 0, origincard);
    }
  });
};

const addCardToColumn = (card: CardContent, dropArgs: DropArgs, kanbanContent: KanbanContent): KanbanContent => {
  const newColumns = kanbanContent.columns.map((column) => {
    if (column.id === dropArgs.columnId) {
      return dropCard(card, dropArgs.cardId, column, dropArgs.closestEdge ?? 'bottom');
    }
    return column;
  });

  return {
    ...kanbanContent,
    columns: newColumns,
  };
};

export const getClosestEdge = (element: Element, client, axis: 'horizontal' | 'vertical'): string | null => {
  const rect = element.getBoundingClientRect();
  let result = null;
  if (axis === 'horizontal')
    result = (rect.left + rect.right) / 2 > client.clientX ? 'left' : 'right'
  if (axis === 'vertical')
    result = (rect.top + rect.bottom) / 2 > client.clientY ? 'top' : 'bottom'
  console.log(result)
  return result
}

type DropArgs = { columnId: string; cardId: string; closestEdge: string };

export const moveCard = (card: CardContent, dropArgs: DropArgs, kanbanContent: KanbanContent): KanbanContent => {
  const newKanbanContent = removeCardFromColumn(card, kanbanContent);
  return addCardToColumn(card, dropArgs, newKanbanContent);
};
