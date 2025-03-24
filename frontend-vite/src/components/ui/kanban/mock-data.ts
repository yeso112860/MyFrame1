import { KanbanContent } from "./model";

// TODO: Move this in the future outside the kanban component folder
export const mockData: KanbanContent = {
  columns: [
    {
      id: 1,
      label: "Backglog",
      content: [
        {
          id: 1,
          title: "Create the cards",
          description:"Creadting cards is a very ardous task"
        },
        {
          id: 2,
          title: "Place the cards in the columns",
        },
        {
          id: 3,
          title: "Implement card dragging",
        },
        {
          id: 4,
          title: "Implement drop card",
        },
        {
          id: 5,
          title: "Implement drag & drop column",
        },
      ],
    },
    {
      id: 2,
      label: "Doing",
      content: [
        {
          id: 6,
          title: "Delete a card",
          description:"Who the hell need this anyway?"
        },
      ],
    },
    {
      id: 3,
      label: "Done",
      content: [
        {
          id: 7,
          title: "Create boilerplate",
          description:"To be able to catch the taste one must learn to cook"
        },
        {
          id: 8,
          title: "Define data model",
        },
        {
          id: 9,
          title: "Create columns",
        },
      ],
    },
  ],
};
