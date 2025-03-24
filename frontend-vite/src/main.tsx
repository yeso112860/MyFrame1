import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {AuthProvider} from 'react-oidc-context';
import {Log, UserManager, WebStorageStateStore} from 'oidc-client-ts';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
//import "primereact/resources/themes/lara-light-indigo/theme.css"; //default theme
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./styles/layout/layout.scss";
import "./index.scss";
import App from "~/App.tsx";

if (import.meta.env.PROD) {
    console.log('Running in production mode, version: ' + import.meta.env.VITE_DEPLOY_VERSION);
} else {
    console.log('Running in development mode');
}

/**
 * See: {@link https://authts.github.io/oidc-client-ts/classes/UserManager.html}
 */
const userManager = new UserManager({
    authority: import.meta.env.VITE_KEYCLOAK_REALM_URL,
    client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    redirect_uri: `${window.location.origin}${window.location.pathname}`,
    post_logout_redirect_uri: window.location.origin,
    scope: 'openid profile',
    //userStore: new WebStorageStateStore({store: window.sessionStorage}),
    userStore: new WebStorageStateStore({store: window.localStorage}),
    monitorSession: true, // this allows cross tab login/logout detection
    automaticSilentRenew: true
});
const onSigninCallback = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
};
Log.setLogger(console);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>
)
