import { createFileRoute } from "@tanstack/react-router";
import { KanbanContainer } from "~/components/ui/kanban/kanban.container";

const DragDrop = () => {

    return (
        <KanbanContainer />
    );
};
export const Route = createFileRoute("/_layout/DragDrop")({
    component: DragDrop,
});