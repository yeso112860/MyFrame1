"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import keycloak from "@/lib/keycloak";

type KeycloakContextType = {
    keycloak: typeof keycloak;
    initialized: boolean;
    authenticated: boolean;
    token?: string;
};

const KCContext = createContext<KeycloakContextType>({
    keycloak,
    initialized: false,
    authenticated: false,
});

export const useKeycloakContext = () => useContext(KCContext);

export function KeycloakProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<KeycloakContextType>({
        keycloak,
        initialized: false,
        authenticated: false,
    });

    useEffect(() => {
        keycloak
            .init({
                onLoad: "login-required", //  'login-required' | 'check-sso'
                silentCheckSsoRedirectUri:
                    window.location.origin + "/silent-check-sso.html",
                pkceMethod: "S256",
            })
            .then((authenticated) => {
                setState({
                    keycloak,
                    initialized: true,
                    authenticated,
                    token: keycloak.token,
                });

                // Schedule token refresh
                setInterval(() => {
                    keycloak
                        .updateToken(30) // refresh if <30s left
                        .then((refreshed) => {
                            if (refreshed) {
                                setState((prev) => ({
                                    ...prev,
                                    token: keycloak.token,
                                }));
                            }
                        })
                        .catch(() => keycloak.login());
                }, 20000);
            })
            .catch((err) => console.error("Keycloak init failed", err));
    }, []);

    return (
        <KCContext.Provider value={state}>{children}</KCContext.Provider>
    );
}
