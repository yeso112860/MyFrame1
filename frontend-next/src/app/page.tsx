"use client";

import { useKeycloakContext } from "@/store/KeycloakContext";

export default function HomePage() {
    const { keycloak, initialized, authenticated, token } = useKeycloakContext();

    if (!initialized) return <p>Loading...</p>;

    return (
        <div>
            {!authenticated ? (
                <button onClick={() => keycloak.login()}>Login</button>
            ) : (
                <>
                    <p>✅ Logged in as: {keycloak.tokenParsed?.preferred_username}</p>
                    <button onClick={() => keycloak.logout()}>Logout</button>
                    <pre style={{ marginTop: "1rem", background: "#eee", padding: "1rem" }}>
            {JSON.stringify(keycloak.tokenParsed, null, 2)}
          </pre>
                </>
            )}
        </div>
    );
}