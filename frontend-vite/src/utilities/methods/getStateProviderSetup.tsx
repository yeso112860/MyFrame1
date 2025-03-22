import { createContext } from "react";

export function getStateProviderSetup<T>(name:string){
    const Context = createContext<ContextState<T>|undefined>(undefined)
}