import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "primereact/button";

export const Route = createFileRoute("/_no-layout/403_Page")({
  component: ForbiddenPageComponent,
});

export default function ForbiddenPageComponent() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-2xl">
      <div className="text-center">
        <strong>403</strong>
      </div>
      <div className="text-center">
        {"Bu sayfaya erişim yetkiniz"} <strong>bulunmamaktadır.</strong>
      </div>
      <div>
        <Button
          icon={"pi pi-angle-left"}
          onClick={() =>
            navigate({
              to: `/`,
            })
          }
          label={"Ana Sayfa"}
        />
      </div>
    </div>
  );
}
