import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "primereact/button";

export const Route = createFileRoute("/_no-layout/401_Page")({
  component: UnAuthPageComponent,
});

export default function UnAuthPageComponent() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-2xl">
      <div className="text-center">
        <strong>401</strong>
      </div>
      <div className="text-center">
        {"İki Aşamalı Doğrulama'yı aktifleştirmediğiniz için sisteme"}{" "}
        <strong>{"giriş yapamazsınız!"}</strong>
      </div>
      <div>
        <Button
          icon={"pi pi-angle-left"}
          onClick={() =>
            navigate({
              to: `/logout`,
            })
          }
          label={"Geri Dön"}
        />
      </div>
    </div>
  );
}
