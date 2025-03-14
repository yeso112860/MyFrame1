import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {AuthProvider} from 'react-oidc-context';
import {routeTree} from "./routeTree.gen";
import {Log, UserManager, WebStorageStateStore} from 'oidc-client-ts';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {addLocale, locale, PrimeReactProvider} from "primereact/api";
import primeTr from "./utilities/translations/prime/tr.json";
//import "primereact/resources/themes/lara-light-indigo/theme.css"; //default theme
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./styles/layout/layout.scss";
import "./index.scss";
import {ToastProvider} from "./store/toastContext.tsx";
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {LoadingQueueProvider} from "./store/loadingContext.tsx";
import {LayoutProvider} from "./store/layoutcontext.tsx";
import {SelectedClientProvider} from "./store/selectedClientContext.tsx";
import {RouterContextProvider} from "./store/routerContext.tsx";
import masterContext from "./store/masterContext.tsx";
import NotFound from "~/routes/_no-layout/NotFound.tsx";

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
    userStore: new WebStorageStateStore({store: window.sessionStorage}),
    // userStore: new WebStorageStateStore({ store: window.localStorage }),
    monitorSession: true, // this allows cross tab login/logout detection
    automaticSilentRenew: true
});
const onSigninCallback = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
};
Log.setLogger(console);

const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
    routeTree,
    defaultNotFoundComponent: () => {
        return (
            <NotFound/>
        )
    },
});
// Register things for typesafety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

addLocale("tr", primeTr["tr"]);
locale("tr");

const primeConfig = {
    locale: "tr",
    pt: {
        card: {
            content: {
                className: "p-0",
            },
        },
    },
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
            <QueryClientProvider client={queryClient}>
                <PrimeReactProvider value={primeConfig}>
                    <ToastProvider>
                        <LoadingQueueProvider>
                            <LayoutProvider>
                                <SelectedClientProvider>
                                    <RouterContextProvider router={router} context={masterContext}>
                                        <RouterProvider router={router} context={masterContext}/>
                                    </RouterContextProvider>
                                </SelectedClientProvider>
                            </LayoutProvider>
                        </LoadingQueueProvider>
                    </ToastProvider>
                </PrimeReactProvider>
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>
)
