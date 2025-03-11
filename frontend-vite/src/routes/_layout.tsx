import {
  createFileRoute,
  Outlet,
  useChildMatches,
  useNavigate,
} from "@tanstack/react-router";
import AppMenu from "../components/ui/layout/AppMenu.tsx";
import { AppTopbarRef, LayoutState } from "../utilities/types";
import { useContext, useEffect, useRef } from "react";
import AppTopbar from "../components/ui/layout/AppTopbar.tsx";
import AppFooter from "../components/ui/layout/AppFooter.tsx";
import { classNames } from "primereact/utils";
import { LayoutContext } from "../store/layoutcontext.tsx";
import { useEventListener, useUnmountEffect } from "primereact/hooks";
import Breadcrumb from "../components/ui/breadcrumb/breadcrumb.tsx";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useMasterContext from "../store/masterContext.tsx";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const auth = useAuth();
  const navigate = useNavigate();
  const masterContext = useMasterContext();

  const { layoutConfig, layoutState, setLayoutState } =
    useContext(LayoutContext);
  const topbarRef = useRef<AppTopbarRef>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const containerClass = classNames("layout-wrapper", {
    "layout-overlay": layoutConfig.menuMode === "overlay",
    "layout-static": layoutConfig.menuMode === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive &&
      layoutConfig.menuMode === "static",
    "layout-overlay-active": layoutState.overlayMenuActive,
    "layout-mobile-active": layoutState.staticMenuMobileActive,
    "p-input-filled": layoutConfig.inputStyle === "filled",
    "p-ripple-disabled": !layoutConfig.ripple,
  });

  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
    useEventListener({
      type: "click",
      listener: (event) => {
        const isOutsideClicked = !(
          sidebarRef.current?.contains(event.target as Node) ||
          topbarRef.current?.menubutton?.contains(event.target as Node)
        );

        if (isOutsideClicked) {
          hideMenu();
        }
      },
    });

  const { pathname, search: searchParams }: never = useChildMatches();
  useEffect(() => {
    hideMenu();
    hideProfileMenu();
  }, [pathname, searchParams]);

  const [
    bindProfileMenuOutsideClickListener,
    unbindProfileMenuOutsideClickListener,
  ] = useEventListener({
    type: "click",
    listener: (event) => {
      const isOutsideClicked = !(
        topbarRef.current?.topbarmenu?.contains(event.target as Node) ||
        topbarRef.current?.topbarmenubutton?.contains(event.target as Node)
      );

      if (isOutsideClicked) {
        hideProfileMenu();
      }
    },
  });

  const hideMenu = () => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    }));
    unbindMenuOutsideClickListener();
    unblockBodyScroll();
  };

  const hideProfileMenu = () => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      profileSidebarVisible: false,
    }));
    unbindProfileMenuOutsideClickListener();
  };

  const blockBodyScroll = (): void => {
    if (document.body.classList) {
      document.body.classList.add("blocked-scroll");
    } else {
      document.body.className += " blocked-scroll";
    }
  };

  const unblockBodyScroll = (): void => {
    if (document.body.classList) {
      document.body.classList.remove("blocked-scroll");
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          "(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)",
          "gi",
        ),
        " ",
      );
    }
  };

  useEffect(() => {
    if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
      bindMenuOutsideClickListener();
    }

    layoutState.staticMenuMobileActive && blockBodyScroll();
  }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

  useEffect(() => {
    if (layoutState.profileSidebarVisible) {
      bindProfileMenuOutsideClickListener();
    }
  }, [layoutState.profileSidebarVisible]);

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener();
    unbindProfileMenuOutsideClickListener();
  });

  useEffect(() => {
    if (!auth.isLoading) {
      if (auth?.user?.access_token) {
        masterContext.setResourceAccess(
          jwtDecode<MyJwt>(auth?.user?.access_token)?.resource_access,
        );
      }

      if (auth?.isAuthenticated) {
        axios.interceptors.request.use(
          function (config) {
            config.headers.Authorization = `Bearer ${auth?.user?.access_token}`;
            return config;
          },
          function (error) {
            return Promise.reject((error) => alert(error));
          },
        );

        axios.interceptors.response.use(
          function (response) {
            return response;
          },
          function (error) {
            error.response.status === 401 && navigate({ to: "/logout" });
            return Promise.reject(error);
          },
        );
      } else {
        navigate({ to: "/login" });
      }
    }
  }, [auth.isLoading]);

  if (!auth.isLoading) {
    return (
      <div className="layout-wrapper layout-static p-ripple-disabled">
        <div className={containerClass}>
          <AppTopbar ref={topbarRef} />
          <div className="layout-sidebar" ref={sidebarRef}>
            <AppMenu />
          </div>
          <div
            className={`layout-main-container ${
              layoutConfig.fullWidthContent
                ? "rounded-0 ml-0 px-0 pt-8"
                : "px-2 lg:px-8"
            }`}
          >
            <div
              className={`layout-main ${
                layoutConfig.fullWidthContent ? "w-full" : ""
              }`}
            >
              {layoutConfig.breadcrumb && <Breadcrumb />}
              <Outlet />
            </div>
            <AppFooter />
          </div>
          <div className="layout-mask"></div>
        </div>
      </div>
    );
  }
}
