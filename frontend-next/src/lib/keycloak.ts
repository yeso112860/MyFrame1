import Keycloak from "keycloak-js";

// Use environment variables for configuration
const keycloak = new Keycloak({
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
});

export default keycloak;