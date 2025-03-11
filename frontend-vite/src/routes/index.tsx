import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "primereact/button";
import { useAuth } from "react-oidc-context";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: HomeView,
  beforeLoad: () => {},
});

function HomeView() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function authContext() {
        if (!auth.isLoading && auth.isAuthenticated)
          await navigate({ to: "/Home" });
    }

    authContext();
  }, [auth.isAuthenticated]);

  return (
    <div className="p-32">
      <h1>Giriş yapmak için butona tıklayın</h1>
      <p>
        Bu ekran geliştirme sürecinde olup diğer modüller ile entegre olduğunda
        kaldırılacaktır.
      </p>
      <Link to="/login">
        <Button label="Giriş Yap" />
      </Link>
    </div>
  );
}
