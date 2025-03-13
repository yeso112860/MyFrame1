import {classNames} from 'primereact/utils';
import {forwardRef, useContext, useImperativeHandle, useRef} from 'react';
import {AppTopbarRef} from '~/utilities/types';
import {LayoutContext} from '~/store/layoutcontext';
import {Link} from "@tanstack/react-router";
import {useAuthHook} from "~/hooks/useAuthHook"
import {Badge} from 'primereact/badge';
import {OverlayPanel} from 'primereact/overlaypanel';
import {Menu} from 'primereact/menu';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const {layoutConfig, layoutState, onMenuToggle, showProfileSidebar} = useContext(LayoutContext);
    const {isAuthenticated, user, login, logout} = useAuthHook();
    const menubuttonRef = useRef(null);
    const profileBtnRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    const {VITE_KEYCLOAK_REALM_URL, VITE_KEYCLOAK_CLIENT_ID} = import.meta.env;
    const accountConsoleUrl = `${VITE_KEYCLOAK_REALM_URL}/account?referrer=${VITE_KEYCLOAK_CLIENT_ID}&referrer_uri=${window.location.origin}`;
    const itemRenderer = (item) => (
        <Link to={item.url}>
            <a className="align-items-center p-menuitem-link flex">
                <span className={item.icon}/>
                <span className="mx-2">{item.label}</span>
                {item.badge && <Badge className="ml-auto" value={item.badge}/>}
                {item.shortcut && (
                    <span className="border-1 surface-border border-round surface-100 ml-auto p-1 text-xs">
                {item.shortcut}
              </span>
                )}
            </a>
        </Link>
    );
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
            template: itemRenderer,
        },
        {
            label: "Profil",
            icon: "pi pi-fw pi-user",
            url: accountConsoleUrl,
            template: itemRenderer,
        },
        {
            label: "Çıkış",
            icon: "pi pi-fw pi-sign-out",
            url: "/logout",
            template: itemRenderer,
        },
    ];

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.png`}
                     width="37.05882353px" height={'35px'} alt="logo"/>
                <span>ProjeM</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button"
                    onClick={onMenuToggle}>
                <i className="pi pi-bars"/>
            </button>

            <button ref={topbarmenubuttonRef} type="button"
                    className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v"/>
            </button>

            <div ref={topbarmenuRef}
                 className={classNames('layout-topbar-menu', {'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible})}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className="p-link layout-topbar-button" onClick={profileBtnRef?.current?.toggle}>
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <OverlayPanel  ref={profileBtnRef} unstyled>
                    <Menu model={nestedMenuitems}/>
                </OverlayPanel>
                <Link to="/documentation">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </Link>
                <button type="button" className="p-link layout-topbar-button" onClick={logout}>
                    <i className="pi pi-power-off"></i>
                    <span>Settings</span>
                </button>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
