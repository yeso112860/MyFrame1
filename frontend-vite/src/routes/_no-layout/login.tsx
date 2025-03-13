import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import useMasterContext from "~/store/masterContext.tsx";
import { useAuth } from "react-oidc-context";

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function authContext() {
      if (auth.isAuthenticated) {
        await navigate({ to: "/" });
      } else {
        await auth.signinRedirect();
      }
    }

    authContext();
  }, []);


  return (
      <div className="p-32">
      </div>
  );
}

export const Route = createFileRoute("/_no-layout/login")({
  component: LoginPage,
});

export default LoginPage;
