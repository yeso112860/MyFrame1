import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { Router } from "@tanstack/react-router";
import CryptoJS from "crypto-js";

const RouterContext = createContext(null);

export const useRouterContext = () => useContext(RouterContext);

interface RouterContextProviderProps {
  children: ReactNode;
  router: Router;
  context: any;
}

export const RouterContextProvider = ({
  children,
  router,
  context,
}: RouterContextProviderProps) => {
  const [state, setState] = useState(() => {
    const storedState = localStorage.getItem("routerState");
    if (storedState) {
      const bytes = CryptoJS.AES.decrypt(
        storedState,
        "ZUVel}*FJ='5ih$A;,a;l=[HjkuKmOGbahji'dy[8id<+hx1Rp>7GglFo,F?&^-",
      );
      const decryptedState = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedState ? JSON.parse(decryptedState) : null;
    }
  });

  const updateState = (newState: Partial<typeof state>) => {
    setState((prev) => {
      const updatedState = { ...prev, ...newState };
      const encryptedState = CryptoJS.AES.encrypt(
        JSON.stringify(updatedState),
        "ZUVel}*FJ='5ih$A;,a;l=[HjkuKmOGbahji'dy[8id<+hx1Rp>7GglFo,F?&^-",
      ).toString();

      localStorage.setItem("routerState", encryptedState);
      return updatedState;
    });
  };

  return (
    <RouterContext.Provider value={{ state, updateState, context, router }}>
      {children}
    </RouterContext.Provider>
  );
};
