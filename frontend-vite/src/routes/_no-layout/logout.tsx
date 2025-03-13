import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { useAuth } from "react-oidc-context";

export const Route = createFileRoute("/_no-layout/logout")({
  component: LogoutPage,
});

export default function LogoutPage() {
  const auth = useAuth();

  useEffect(() => {
      auth.signoutRedirect();
  }, []);

  return (
    <div className="p-32">
      <h1>Çıkış yaptınız!</h1>
      <p>
        Bu ekran geliştirme sürecinde olup diğer modüller tamamlandığında proje
        açılış sayfasına yönlendirilecektir.
      </p>
      <Link to="/login">
        <Button label="Giriş Yap" />
      </Link>
    </div>
  );
}
