import { Link, useNavigate } from "@tanstack/react-router";
import { classNames } from "primereact/utils";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AppTopbarRef } from "~/utilities/types";
import { LayoutContext } from "~/store/layoutcontext.tsx";
import { useAuthHook } from "~/hooks/useAuthHook.tsx";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { OverlayPanel } from "primereact/overlaypanel";
import { useSelectedClient } from "~/store/selectedClientContext.tsx";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const { isAuthenticated, user, login, logout } = useAuthHook();
  const { layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const profileBtnRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const [name, setName] = useState("");

  const { selectedId, setSelectedClient, selectedClientName } =
    useSelectedClient();

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  useEffect(() => {
    isAuthenticated &&
      setName("Hoşgeldiniz Sn. " + user?.profile?.family_name);
  }, [isAuthenticated]);

  const navigate = useNavigate();

  useEffect(() => {
    const selectedId = localStorage.getItem("selectedId");
    const selectedClientId = localStorage.getItem("selectedClientId");
    const selectedClientType = localStorage.getItem("selectedClientType");
    const selectedClientName = localStorage.getItem("selectedClientName");
    if (
      selectedId &&
      selectedClientId &&
      selectedClientType &&
      selectedClientName
    ) {
      setSelectedClient({
        id: selectedId,
        clientID: selectedClientId,
        clientType: selectedClientType,
        clientName: selectedClientName,
      });
    } else {
      navigate({ to: "/Home" });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("routerState", "");
  }, [selectedId]);

  const itemRenderer = (item) => (
    <Link to={item.url}>
      <a className="align-items-center p-menuitem-link flex">
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
        {item.badge && <Badge className="ml-auto" value={item.badge} />}
        {item.shortcut && (
          <span className="border-1 surface-border border-round surface-100 ml-auto p-1 text-xs">
            {item.shortcut}
          </span>
        )}
      </a>
    </Link>
  );
  const { VITE_KEYCLOAK_REALM_URL, VITE_KEYCLOAK_CLIENT_ID } = import.meta.env;
  const accountConsoleUrl = `${VITE_KEYCLOAK_REALM_URL}/account?referrer=${VITE_KEYCLOAK_CLIENT_ID}&referrer_uri=${window.location.origin}`;
  const nestedMenuitems = [
    {
      label: "Bildirimler",
      icon: "pi pi-fw pi-envelope",
      badge: "2",
      template: itemRenderer,
      command: () => {
        alert("Notification");
      },
    },
    {
      label: "Ayarlar",
      icon: "pi pi-fw pi-cog",
      url: accountConsoleUrl,
      // url: "/administration/kullanici-islemleri/users/profile",
      template: itemRenderer,
    },
    {
      label: "Profil",
      icon: "pi pi-fw pi-user",
      url: accountConsoleUrl,
//      url: "/administration/kullanici-islemleri/users/profilim",
      template: itemRenderer,
    },
    {
      label: "Çıkış",
      icon: "pi pi-fw pi-sign-out",
      url: "/logout",
      template: itemRenderer,
    },
  ];

  return (
    (
      <div className="layout-topbar">
        <button
          ref={menubuttonRef}
          type="button"
          className="p-link layout-menu-button layout-topbar-button"
          onClick={onMenuToggle}
        >
          <i className="pi pi-bars" />
        </button>

        <div className={"-mr-2"}>
          <Link to="/Home" className="layout-topbar-logo text-xl">
            <img
              src="/framework_logo.png"
              alt={"İşi bilip işe gitmeyenlere"}
            />
            <div className="text-primary-900 text-balance pt-1">
              {"İşi bilip işe gitmeyenlerle hep birlikte"}
            </div>
          </Link>
        </div>

        <button
          ref={topbarmenubuttonRef}
          type="button"
          className="p-link layout-topbar-menu-button layout-topbar-button"
          onClick={showProfileSidebar}
        >
          <i className="pi pi-ellipsis-v" />
        </button>

        <div className={"w-full max-md:hidden"}>
          <div />
        </div>

        <div
          ref={topbarmenuRef}
          className={classNames("layout-topbar-menu ml-2 items-center", {
            "layout-topbar-menu-mobile-active":
              layoutState.profileSidebarVisible,
          })}
        >
          <span className="mx-4 w-full">{name}</span>

          <button
            onClick={profileBtnRef?.current?.toggle}
            type="button"
            className="p-link layout-topbar-button"
          >
            <i className="pi pi-user"></i>
            <span>Profile</span>
          </button>

          <OverlayPanel ref={profileBtnRef} unstyled>
            <Menu model={nestedMenuitems} />
          </OverlayPanel>

          <Link>
            <Button onClick={() => logout()} icon="pi pi-power-off"/>
          </Link>
        </div>
      </div>
    )
  );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
