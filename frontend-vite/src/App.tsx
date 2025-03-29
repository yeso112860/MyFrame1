import {useEffect, useState} from 'react';
import {hasAuthParams, useAuth} from 'react-oidc-context';
import {addLocale, locale, PrimeReactProvider} from "primereact/api";
import {ToastProvider} from "~/store/toastContext.tsx";
import {LoadingQueueProvider} from "~/store/loadingContext.tsx";
import {LayoutProvider} from "~/store/layoutcontext.tsx";
import {SelectedClientProvider} from "~/store/selectedClientContext.tsx";
import {RouterContextProvider} from "~/store/routerContext.tsx";
import masterContext from "~/store/masterContext.tsx";
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "~/routeTree.gen.ts";
import NotFound from "~/routes/_no-layout/NotFound.tsx";
import ErrorPage from "~/routes/_no-layout/ErrorPage.tsx";
import primeTr from "./utilities/translations/prime/tr.json";

// Set up a Router instance
const router = createRouter({
    routeTree,
    defaultNotFoundComponent: ({data}) => <NotFound data={data}/>,
    defaultErrorComponent: ({error, info, reset}) => <ErrorPage error={error} info={info} reset={reset}/>
});
// Register things for typesafety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const App = () => {
    const auth = useAuth();
    const [hasTriedSignin, setHasTriedSignin] = useState(false);

    /**
     * Automatic sign-in
     *
     * See {@link https://github.com/authts/react-oidc-context?tab=readme-ov-file#automatic-sign-in}
     */
    useEffect(() => {
        if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading && !hasTriedSignin) {
            auth.signinRedirect();
            setHasTriedSignin(true);
        }
    }, [auth, hasTriedSignin]);

    if (auth.isLoading) {
        return (
            <div className="flex justify-center items-center h-24 mt-48">
                <span className="loading loading-spinner loading-lg"></span>
                <span className="ml-8 text-lg font-medium">
          Loading... (it may take a while for the first time, just have some coffee~ ☕️)
        </span>
            </div>
        );
    }

    if (auth.error || !auth.isAuthenticated) {
        return (
            <div role="alert" className="alert alert-error">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                {auth.error ? (
                    <span>😬 Ops, login error: {auth.error.message} (checkout Keycloak status and configuration)</span>
                ) : (
                    <span>🤔 You're still not authenticated, and I don't know why... Maybe you can find out! </span>
                )}
            </div>
        );
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

    return (
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

    );
};

// const ProtectedApp = withAuthenticationRequired(App, {
//   OnRedirecting: () => <div>Redirecting to the login page...</div>
// });
// export default ProtectedApp;

export default App;
