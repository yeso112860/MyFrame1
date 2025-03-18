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
import { Route as NoLayoutNotFoundImport } from './routes/_no-layout/NotFound'
import { Route as NoLayoutErrorPageImport } from './routes/_no-layout/ErrorPage'
import { Route as NoLayoutAccessDeniedImport } from './routes/_no-layout/AccessDenied'
import { Route as NoLayout403PageImport } from './routes/_no-layout/403_Page'
import { Route as LayoutDocumentationImport } from './routes/_layout/documentation'
import { Route as LayoutHomebckImport } from './routes/_layout/Home_bck'
import { Route as LayoutHome2Import } from './routes/_layout/Home2'
import { Route as LayoutHomeImport } from './routes/_layout/Home'
import { Route as LayoutEmptyImport } from './routes/_layout/Empty'

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

const NoLayoutNotFoundRoute = NoLayoutNotFoundImport.update({
  id: '/NotFound',
  path: '/NotFound',
  getParentRoute: () => NoLayoutRoute,
} as any)

const NoLayoutErrorPageRoute = NoLayoutErrorPageImport.update({
  id: '/ErrorPage',
  path: '/ErrorPage',
  getParentRoute: () => NoLayoutRoute,
} as any)

const NoLayoutAccessDeniedRoute = NoLayoutAccessDeniedImport.update({
  id: '/AccessDenied',
  path: '/AccessDenied',
  getParentRoute: () => NoLayoutRoute,
} as any)

const NoLayout403PageRoute = NoLayout403PageImport.update({
  id: '/403_Page',
  path: '/403_Page',
  getParentRoute: () => NoLayoutRoute,
} as any)

const LayoutDocumentationRoute = LayoutDocumentationImport.update({
  id: '/documentation',
  path: '/documentation',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutHomebckRoute = LayoutHomebckImport.update({
  id: '/Home_bck',
  path: '/Home_bck',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutHome2Route = LayoutHome2Import.update({
  id: '/Home2',
  path: '/Home2',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutHomeRoute = LayoutHomeImport.update({
  id: '/Home',
  path: '/Home',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutEmptyRoute = LayoutEmptyImport.update({
  id: '/Empty',
  path: '/Empty',
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
    '/_layout/Empty': {
      id: '/_layout/Empty'
      path: '/Empty'
      fullPath: '/Empty'
      preLoaderRoute: typeof LayoutEmptyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/Home': {
      id: '/_layout/Home'
      path: '/Home'
      fullPath: '/Home'
      preLoaderRoute: typeof LayoutHomeImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/Home2': {
      id: '/_layout/Home2'
      path: '/Home2'
      fullPath: '/Home2'
      preLoaderRoute: typeof LayoutHome2Import
      parentRoute: typeof LayoutImport
    }
    '/_layout/Home_bck': {
      id: '/_layout/Home_bck'
      path: '/Home_bck'
      fullPath: '/Home_bck'
      preLoaderRoute: typeof LayoutHomebckImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/documentation': {
      id: '/_layout/documentation'
      path: '/documentation'
      fullPath: '/documentation'
      preLoaderRoute: typeof LayoutDocumentationImport
      parentRoute: typeof LayoutImport
    }
    '/_no-layout/403_Page': {
      id: '/_no-layout/403_Page'
      path: '/403_Page'
      fullPath: '/403_Page'
      preLoaderRoute: typeof NoLayout403PageImport
      parentRoute: typeof NoLayoutImport
    }
    '/_no-layout/AccessDenied': {
      id: '/_no-layout/AccessDenied'
      path: '/AccessDenied'
      fullPath: '/AccessDenied'
      preLoaderRoute: typeof NoLayoutAccessDeniedImport
      parentRoute: typeof NoLayoutImport
    }
    '/_no-layout/ErrorPage': {
      id: '/_no-layout/ErrorPage'
      path: '/ErrorPage'
      fullPath: '/ErrorPage'
      preLoaderRoute: typeof NoLayoutErrorPageImport
      parentRoute: typeof NoLayoutImport
    }
    '/_no-layout/NotFound': {
      id: '/_no-layout/NotFound'
      path: '/NotFound'
      fullPath: '/NotFound'
      preLoaderRoute: typeof NoLayoutNotFoundImport
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
  LayoutEmptyRoute: typeof LayoutEmptyRoute
  LayoutHomeRoute: typeof LayoutHomeRoute
  LayoutHome2Route: typeof LayoutHome2Route
  LayoutHomebckRoute: typeof LayoutHomebckRoute
  LayoutDocumentationRoute: typeof LayoutDocumentationRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutEmptyRoute: LayoutEmptyRoute,
  LayoutHomeRoute: LayoutHomeRoute,
  LayoutHome2Route: LayoutHome2Route,
  LayoutHomebckRoute: LayoutHomebckRoute,
  LayoutDocumentationRoute: LayoutDocumentationRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

interface NoLayoutRouteChildren {
  NoLayout403PageRoute: typeof NoLayout403PageRoute
  NoLayoutAccessDeniedRoute: typeof NoLayoutAccessDeniedRoute
  NoLayoutErrorPageRoute: typeof NoLayoutErrorPageRoute
  NoLayoutNotFoundRoute: typeof NoLayoutNotFoundRoute
  NoLayoutLoginRoute: typeof NoLayoutLoginRoute
  NoLayoutLogoutRoute: typeof NoLayoutLogoutRoute
}

const NoLayoutRouteChildren: NoLayoutRouteChildren = {
  NoLayout403PageRoute: NoLayout403PageRoute,
  NoLayoutAccessDeniedRoute: NoLayoutAccessDeniedRoute,
  NoLayoutErrorPageRoute: NoLayoutErrorPageRoute,
  NoLayoutNotFoundRoute: NoLayoutNotFoundRoute,
  NoLayoutLoginRoute: NoLayoutLoginRoute,
  NoLayoutLogoutRoute: NoLayoutLogoutRoute,
}

const NoLayoutRouteWithChildren = NoLayoutRoute._addFileChildren(
  NoLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof NoLayoutRouteWithChildren
  '/Empty': typeof LayoutEmptyRoute
  '/Home': typeof LayoutHomeRoute
  '/Home2': typeof LayoutHome2Route
  '/Home_bck': typeof LayoutHomebckRoute
  '/documentation': typeof LayoutDocumentationRoute
  '/403_Page': typeof NoLayout403PageRoute
  '/AccessDenied': typeof NoLayoutAccessDeniedRoute
  '/ErrorPage': typeof NoLayoutErrorPageRoute
  '/NotFound': typeof NoLayoutNotFoundRoute
  '/login': typeof NoLayoutLoginRoute
  '/logout': typeof NoLayoutLogoutRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof NoLayoutRouteWithChildren
  '/Empty': typeof LayoutEmptyRoute
  '/Home': typeof LayoutHomeRoute
  '/Home2': typeof LayoutHome2Route
  '/Home_bck': typeof LayoutHomebckRoute
  '/documentation': typeof LayoutDocumentationRoute
  '/403_Page': typeof NoLayout403PageRoute
  '/AccessDenied': typeof NoLayoutAccessDeniedRoute
  '/ErrorPage': typeof NoLayoutErrorPageRoute
  '/NotFound': typeof NoLayoutNotFoundRoute
  '/login': typeof NoLayoutLoginRoute
  '/logout': typeof NoLayoutLogoutRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/_no-layout': typeof NoLayoutRouteWithChildren
  '/_layout/Empty': typeof LayoutEmptyRoute
  '/_layout/Home': typeof LayoutHomeRoute
  '/_layout/Home2': typeof LayoutHome2Route
  '/_layout/Home_bck': typeof LayoutHomebckRoute
  '/_layout/documentation': typeof LayoutDocumentationRoute
  '/_no-layout/403_Page': typeof NoLayout403PageRoute
  '/_no-layout/AccessDenied': typeof NoLayoutAccessDeniedRoute
  '/_no-layout/ErrorPage': typeof NoLayoutErrorPageRoute
  '/_no-layout/NotFound': typeof NoLayoutNotFoundRoute
  '/_no-layout/login': typeof NoLayoutLoginRoute
  '/_no-layout/logout': typeof NoLayoutLogoutRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/Empty'
    | '/Home'
    | '/Home2'
    | '/Home_bck'
    | '/documentation'
    | '/403_Page'
    | '/AccessDenied'
    | '/ErrorPage'
    | '/NotFound'
    | '/login'
    | '/logout'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/Empty'
    | '/Home'
    | '/Home2'
    | '/Home_bck'
    | '/documentation'
    | '/403_Page'
    | '/AccessDenied'
    | '/ErrorPage'
    | '/NotFound'
    | '/login'
    | '/logout'
  id:
    | '__root__'
    | '/'
    | '/_layout'
    | '/_no-layout'
    | '/_layout/Empty'
    | '/_layout/Home'
    | '/_layout/Home2'
    | '/_layout/Home_bck'
    | '/_layout/documentation'
    | '/_no-layout/403_Page'
    | '/_no-layout/AccessDenied'
    | '/_no-layout/ErrorPage'
    | '/_no-layout/NotFound'
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
        "/_layout/Empty",
        "/_layout/Home",
        "/_layout/Home2",
        "/_layout/Home_bck",
        "/_layout/documentation"
      ]
    },
    "/_no-layout": {
      "filePath": "_no-layout.tsx",
      "children": [
        "/_no-layout/403_Page",
        "/_no-layout/AccessDenied",
        "/_no-layout/ErrorPage",
        "/_no-layout/NotFound",
        "/_no-layout/login",
        "/_no-layout/logout"
      ]
    },
    "/_layout/Empty": {
      "filePath": "_layout/Empty.tsx",
      "parent": "/_layout"
    },
    "/_layout/Home": {
      "filePath": "_layout/Home.tsx",
      "parent": "/_layout"
    },
    "/_layout/Home2": {
      "filePath": "_layout/Home2.tsx",
      "parent": "/_layout"
    },
    "/_layout/Home_bck": {
      "filePath": "_layout/Home_bck.tsx",
      "parent": "/_layout"
    },
    "/_layout/documentation": {
      "filePath": "_layout/documentation.tsx",
      "parent": "/_layout"
    },
    "/_no-layout/403_Page": {
      "filePath": "_no-layout/403_Page.tsx",
      "parent": "/_no-layout"
    },
    "/_no-layout/AccessDenied": {
      "filePath": "_no-layout/AccessDenied.tsx",
      "parent": "/_no-layout"
    },
    "/_no-layout/ErrorPage": {
      "filePath": "_no-layout/ErrorPage.tsx",
      "parent": "/_no-layout"
    },
    "/_no-layout/NotFound": {
      "filePath": "_no-layout/NotFound.tsx",
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
