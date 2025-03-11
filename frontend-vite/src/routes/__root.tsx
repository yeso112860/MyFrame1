import {createRootRoute, Outlet} from "@tanstack/react-router";
import {useEffect, useState} from "react";
import {hasAuthParams, useAuth} from "react-oidc-context";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const auth = useAuth();
    const [hasTriedSignin, setHasTriedSignin] = useState(false);
    useEffect(() => {
        if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading && !hasTriedSignin) {
            auth.signinRedirect();
            setHasTriedSignin(true);
        }
    }, [auth, hasTriedSignin]);
    return (
        <Outlet/>
    );
}
