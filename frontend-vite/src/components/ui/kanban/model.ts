type Outcome =
  | {
    type: 'column-reorder';
    columnId: string;
    startIndex: number;
    finishIndex: number;
  } | {
    type: 'card-reorder';
    columnId: string;
    startIndex: number;
    finishIndex: number;
  } | {
    type: 'card-move';
    finishColumnId: string;
    itemIndexInStartColumn: number;
    itemIndexInFinishColumn: number;
  };

export interface CardContent {
  id: string;
  title: string;
  description: string;
}

export interface Column {
  id: string;
  label: string;
  content: CardContent[];
}

export interface KanbanContent {
  columns: Column[];
}

export const createDefaultKanbanContent = (): KanbanContent => ({
  columns: [],
});
