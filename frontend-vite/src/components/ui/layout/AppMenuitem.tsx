import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { AppMenuItemProps } from "~/utilities/types";
import { MenuContext } from "~/store/menucontext.tsx";
import { Link, useChildMatches } from "@tanstack/react-router";
import { isNullOrUndef } from "chart.js/helpers";

const AppMenuitem = (props: AppMenuItemProps) => {
  const matchRoute: never = useChildMatches();
  const pathname = matchRoute?.pathname;
  const searchParams = matchRoute?.search;
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const [item] = useState(props.item);
  const key = props.parentKey
    ? props.parentKey + "-" + props.index
    : String(props.index);
  const isActiveRoute = item!.to && pathname === item!.to;
  const active = activeMenu === key || activeMenu.startsWith(key + "-");

  // State to control expand/collapse of root items
  const [isExpanded, setIsExpanded] = useState(true);
  const expandRef = useRef(isExpanded); // To keep track of current expand state

  const onRouteChange = (url: string) => {
    if (item!.url && item!.to === url) {
      setActiveMenu(key);
    }
  };

  useEffect(() => {
    if (pathname) {
      onRouteChange(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Update ref value when expanded state changes
  useEffect(() => {
    expandRef.current = isExpanded;
  }, [isExpanded]);

  const itemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (item!.disabled) {
      event.preventDefault();
      return;
    }

    // Eğer alt menü varsa sadece alt menüye tıklanınca işaretleme yap
    if (item!.items) {
      setActiveMenu(active ? (props.parentKey as string) : key);
    } else {
      setActiveMenu(key); // Sadece tıklandığında menü işaretlenir
    }
  };

  // Toggle expand/collapse state without interference
  const toggleExpand = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent propagation to avoid unwanted re-renders
    setIsExpanded(!expandRef.current);
  };

  const subMenu = item!.items && item!.visible !== false && (
    <CSSTransition
      timeout={{ enter: 1000, exit: 450 }}
      classNames="layout-submenu"
      in={props.root ? isExpanded : active} // Control submenu visibility
      key={item!.label}
      unmountOnExit // Ensure submenu is removed from DOM when not visible
    >
      <ul>
        {item!.items.map((child, i) => {
          return (
            <AppMenuitem
              item={child}
              index={i}
              className={child.badgeClass}
              parentKey={key}
              key={child.label}
            />
          );
        })}
      </ul>
    </CSSTransition>
  );

  const hasValidSubItems = (items: any[]) => {
    if (isNullOrUndef(items)) return false;
    return items.some((subItem) => {
      if (subItem.items) {
        subItem.items.some((item) => {
          const f = item.url && item.url !== "";
          return f;
        });
      } else {
        const a = subItem.url && subItem.url !== "";
        return a;
      }
    });
  };

  if (
    (item!.url && item!.url.includes("/dashboard")) ||
    (!item!.url && !item!.items) ||
    (item!.items?.length <= 0 && !hasValidSubItems(item!.items)) ||
    (import.meta.env.MODE === "uat" && item?.UATvisible === false)
  ) {
    return null;
  }

  return (
    <li
      className={classNames({
        "layout-root-menuitem": props.root,
        "active-menuitem": active,
      })}
    >
      {props.root && item!.visible !== false && (
        <div
          className="layout-menuitem-root-text flex cursor-pointer items-center rounded px-3 py-2 transition duration-300"
          onClick={toggleExpand}
        >
          <i
            className={classNames("layout-menuitem-icon pr-2", item!.icon)}
          ></i>
          {item!.label}

          {/* Toggler Button */}
          {item!.items && (
            <i
              className={classNames(
                "pi",
                isExpanded ? "pi-angle-up" : "pi-angle-down",
                "ml-2",
              )}
            ></i>
          )}
        </div>
      )}

      {(!item!.to || item!.items) && item!.visible !== false ? (
        <Link
          to={item!.url}
          onClick={(e) => itemClick(e)}
          className={classNames(
            item!.class,
            "p-ripple" +
              (active
                ? localStorage.getItem("theme") == "lara-dark-indigo"
                  ? " dark:bg-slate-900"
                  : " bg-indigo-50 dark:bg-slate-900"
                : ""),
          )}
          target={item!.target}
          tabIndex={0}
        >
          <i className={classNames("layout-menuitem-icon", item!.icon)}></i>
          <span className="layout-menuitem-text">{item!.label}</span>
          {item!.items && (
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
          )}
        </Link>
      ) : null}

      {item!.to && !item!.items && item!.visible !== false ? (
        <Link
          to={item!.url}
          target={item!.target}
          onClick={(e) => itemClick(e)}
          className={classNames(item!.class, "p-ripple", {
            "active-route": isActiveRoute,
          })}
          tabIndex={0}
        >
          <i className={classNames("layout-menuitem-icon", item!.icon)}></i>
          <span className="layout-menuitem-text">{item!.label}</span>
          {item!.items && (
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
          )}
        </Link>
      ) : null}

      {subMenu}
    </li>
  );
};

export default AppMenuitem;
