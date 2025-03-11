import {create, StoreApi, UseBoundStore} from "zustand";

export const useMasterContext:UseBoundStore<StoreApi<unknown>> = create((set) => ({
  auth: {},
  setAuth: (_auth) => set(() => ({ auth: { ..._auth } })),
  roles: [],
  setRoles: (_roles) => set(() => ({ roles: _roles })),
  resourceAccess: [],
  setResourceAccess: (_resourceAccess) =>
      set(() => ({ resourceAccess: _resourceAccess })),
  routerContext: {},
  setRouterContext: (_routerContext) =>
      set(() => ({ routerContext: _routerContext })),
}));


export default useMasterContext;
