import {useAuth} from "react-oidc-context";
import {useEffect} from "react";

export function useAuthHook(autoLogin = false) {
    const auth = useAuth();

    const isAuthenticated = auth.isAuthenticated;
    const isLoading = auth.isLoading;

    const user = auth.user;

    useEffect(() => {
        if (autoLogin && !isAuthenticated) {
            auth.signinRedirect()
        }
    }, []);

    function login() {
        auth.signinRedirect()
    }

    function logout() {
        auth.signoutRedirect()
    }


    return {login, logout, isAuthenticated, isLoading, user};
}

