import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_no-layout")({
  component: NoLayoutComponent,
});

function NoLayoutComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
