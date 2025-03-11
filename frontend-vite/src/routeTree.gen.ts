/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as NoLayoutImport } from './routes/_no-layout'
import { Route as LayoutImport } from './routes/_layout'
import { Route as IndexImport } from './routes/index'
import { Route as NoLayoutLogoutImport } from './routes/_no-layout/logout'
import { Route as NoLayoutLoginImport } from './routes/_no-layout/login'
import { Route as NoLayout403PageImport } from './routes/_no-layout/403_Page'
import { Route as NoLayout401PageImport } from './routes/_no-layout/401_Page'
import { Route as LayoutPlaygroundImport } from './routes/_layout/Playground'
import { Route as LayoutNotFoundImport } from './routes/_layout/NotFound'
import { Route as LayoutHomeImport } from './routes/_layout/Home'

// Create/Update Routes

const NoLayoutRoute = NoLayoutImport.update({
  id: '/_no-layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const NoLayoutLogoutRoute = NoLayoutLogoutImport.update({
  id: '/logout',
  path: '/logout',
  getParentRoute: () => NoLayoutRoute,
} as any)

const NoLayoutLoginRoute = NoLayoutLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => NoLayoutRoute,
} as any)

const NoLayout403PageRoute = NoLayout403PageImport.update({
  id: '/403_Page',
  path: '/403_Page',
  getParentRoute: () => NoLayoutRoute,
} as any)

const NoLayout401PageRoute = NoLayout401PageImport.update({
  id: '/401_Page',
  path: '/401_Page',
  getParentRoute: () => NoLayoutRoute,
} as any)

const LayoutPlaygroundRoute = LayoutPlaygroundImport.update({
  id: '/Playground',
  path: '/Playground',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutNotFoundRoute = LayoutNotFoundImport.update({
  id: '/NotFound',
  path: '/NotFound',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutHomeRoute = LayoutHomeImport.update({
  id: '/Home',
  path: '/Home',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_no-layout': {
      id: '/_no-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof NoLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/Home': {
      id: '/_layout/Home'
      path: '/Home'
      fullPath: '/Home'
      preLoaderRoute: typeof LayoutHomeImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/NotFound': {
      id: '/_layout/NotFound'
      path: '/NotFound'
      fullPath: '/NotFound'
      preLoaderRoute: typeof LayoutNotFoundImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/Playground': {
      id: '/_layout/Playground'
      path: '/Playground'
      fullPath: '/Playground'
      preLoaderRoute: typeof LayoutPlaygroundImport
      parentRoute: typeof LayoutImport
    }
    '/_no-layout/401_Page': {
      id: '/_no-layout/401_Page'
      path: '/401_Page'
      fullPath: '/401_Page'
      preLoaderRoute: typeof NoLayout401PageImport
      parentRoute: typeof NoLayoutImport
    }
    '/_no-layout/403_Page': {
      id: '/_no-layout/403_Page'
      path: '/403_Page'
      fullPath: '/403_Page'
      preLoaderRoute: typeof NoLayout403PageImport
      parentRoute: typeof NoLayoutImport
    }
    '/_no-layout/login': {
      id: '/_no-layout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof NoLayoutLoginImport
      parentRoute: typeof NoLayoutImport
    }
    '/_no-layout/logout': {
      id: '/_no-layout/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof NoLayoutLogoutImport
      parentRoute: typeof NoLayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutHomeRoute: typeof LayoutHomeRoute
  LayoutNotFoundRoute: typeof LayoutNotFoundRoute
  LayoutPlaygroundRoute: typeof LayoutPlaygroundRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutHomeRoute: LayoutHomeRoute,
  LayoutNotFoundRoute: LayoutNotFoundRoute,
  LayoutPlaygroundRoute: LayoutPlaygroundRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

interface NoLayoutRouteChildren {
  NoLayout401PageRoute: typeof NoLayout401PageRoute
  NoLayout403PageRoute: typeof NoLayout403PageRoute
  NoLayoutLoginRoute: typeof NoLayoutLoginRoute
  NoLayoutLogoutRoute: typeof NoLayoutLogoutRoute
}

const NoLayoutRouteChildren: NoLayoutRouteChildren = {
  NoLayout401PageRoute: NoLayout401PageRoute,
  NoLayout403PageRoute: NoLayout403PageRoute,
  NoLayoutLoginRoute: NoLayoutLoginRoute,
  NoLayoutLogoutRoute: NoLayoutLogoutRoute,
}

const NoLayoutRouteWithChildren = NoLayoutRoute._addFileChildren(
  NoLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof NoLayoutRouteWithChildren
  '/Home': typeof LayoutHomeRoute
  '/NotFound': typeof LayoutNotFoundRoute
  '/Playground': typeof LayoutPlaygroundRoute
  '/401_Page': typeof NoLayout401PageRoute
  '/403_Page': typeof NoLayout403PageRoute
  '/login': typeof NoLayoutLoginRoute
  '/logout': typeof NoLayoutLogoutRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof NoLayoutRouteWithChildren
  '/Home': typeof LayoutHomeRoute
  '/NotFound': typeof LayoutNotFoundRoute
  '/Playground': typeof LayoutPlaygroundRoute
  '/401_Page': typeof NoLayout401PageRoute
  '/403_Page': typeof NoLayout403PageRoute
  '/login': typeof NoLayoutLoginRoute
  '/logout': typeof NoLayoutLogoutRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/_no-layout': typeof NoLayoutRouteWithChildren
  '/_layout/Home': typeof LayoutHomeRoute
  '/_layout/NotFound': typeof LayoutNotFoundRoute
  '/_layout/Playground': typeof LayoutPlaygroundRoute
  '/_no-layout/401_Page': typeof NoLayout401PageRoute
  '/_no-layout/403_Page': typeof NoLayout403PageRoute
  '/_no-layout/login': typeof NoLayoutLoginRoute
  '/_no-layout/logout': typeof NoLayoutLogoutRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/Home'
    | '/NotFound'
    | '/Playground'
    | '/401_Page'
    | '/403_Page'
    | '/login'
    | '/logout'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/Home'
    | '/NotFound'
    | '/Playground'
    | '/401_Page'
    | '/403_Page'
    | '/login'
    | '/logout'
  id:
    | '__root__'
    | '/'
    | '/_layout'
    | '/_no-layout'
    | '/_layout/Home'
    | '/_layout/NotFound'
    | '/_layout/Playground'
    | '/_no-layout/401_Page'
    | '/_no-layout/403_Page'
    | '/_no-layout/login'
    | '/_no-layout/logout'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LayoutRoute: typeof LayoutRouteWithChildren
  NoLayoutRoute: typeof NoLayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LayoutRoute: LayoutRouteWithChildren,
  NoLayoutRoute: NoLayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_layout",
        "/_no-layout"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/Home",
        "/_layout/NotFound",
        "/_layout/Playground"
      ]
    },
    "/_no-layout": {
      "filePath": "_no-layout.tsx",
      "children": [
        "/_no-layout/401_Page",
        "/_no-layout/403_Page",
        "/_no-layout/login",
        "/_no-layout/logout"
      ]
    },
    "/_layout/Home": {
      "filePath": "_layout/Home.tsx",
      "parent": "/_layout"
    },
    "/_layout/NotFound": {
      "filePath": "_layout/NotFound.tsx",
      "parent": "/_layout"
    },
    "/_layout/Playground": {
      "filePath": "_layout/Playground.tsx",
      "parent": "/_layout"
    },
    "/_no-layout/401_Page": {
      "filePath": "_no-layout/401_Page.tsx",
      "parent": "/_no-layout"
    },
    "/_no-layout/403_Page": {
      "filePath": "_no-layout/403_Page.tsx",
      "parent": "/_no-layout"
    },
    "/_no-layout/login": {
      "filePath": "_no-layout/login.tsx",
      "parent": "/_no-layout"
    },
    "/_no-layout/logout": {
      "filePath": "_no-layout/logout.tsx",
      "parent": "/_no-layout"
    }
  }
}
ROUTE_MANIFEST_END */
