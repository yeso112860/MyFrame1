import React, { useEffect, useState } from "react";
import { MenuProvider } from "~/store/menucontext.tsx";
import AppMenuitem from "./AppMenuitem.tsx";
import { Link } from "@tanstack/react-router";
import { getMenu, getStaticMenu } from "./menu.ts";
import { useMasterContext } from "~/store/masterContext";
import { AppMenuItem } from "~/utilities/types";
import { useSelectedClient } from "~/store/selectedClientContext.tsx";
import CryptoJS from "crypto-js";

const AppMenu = () => {
  const { resourceAccess } = useMasterContext();
  const [filteredItems, setFilteredItems] = useState<AppMenuItem[]>([]);
  const [filteredStaticItems, setFilteredStaticItems] = useState<AppMenuItem[]>(
    [],
  );

  const { selectedId, selectedClientID, selectedClientType } =
    useSelectedClient();
  const items = getMenu();
  const staticItems = getStaticMenu();

  const [menuKey, setMenuKey] = useState(0);

  useEffect(() => {
    if (selectedId !== "" && selectedClientID !== "") {
      let userRoles = resourceAccess["movies-app"]?.roles || [];
      if (selectedClientType === "Kurum" || selectedClientType === "Firma") {
        userRoles = [];
        userRoles.push("KURUM YETKİLİSİ");
      }

      const encryptedState = CryptoJS.AES.encrypt(
        JSON.stringify(userRoles),
        "ZUVel}*FJ='5ih$A;,a;l=[HjkuKmOGbahji'dy[8id<+hx1Rp>7GglFo,F?&^-",
      ).toString();

      localStorage.setItem("userRoles", encryptedState);

      const hasAnyRequiredRole = (
        itemRoles: string[],
        userRoles: string[],
      ): boolean => {
        const normalizedUserRoles = userRoles.map((role) => role.toUpperCase());
        const normalizedItemRoles = itemRoles.map((role) => role.toUpperCase());

        return normalizedItemRoles.some((itemRole) =>
          normalizedUserRoles.includes(itemRole),
        );
      };

      const filterMenuItems = (menuItems: AppMenuItem[]): AppMenuItem[] => {
        return menuItems
          .filter((item) => {
            console.log(userRoles)
            if (item.roles && item.roles.length > 0) {
              return hasAnyRequiredRole(item.roles, userRoles);
            }

            if (item.items && item.items.length > 0) {
              const filteredSubItems = filterMenuItems(item.items);
              return filteredSubItems.length > 0;
            }

            return false;
          })
          .map((item) => {
            if (item.items) {
              return {
                ...item,
                items: filterMenuItems(item.items),
              };
            }
            return item;
          });
      };
      const newFilteredItems = items;//filterMenuItems(items);
      const newFilteredStaticItems = staticItems;//filterMenuItems(staticItems);
      setFilteredItems(newFilteredItems);
      setFilteredStaticItems(newFilteredStaticItems);
    } else {
      setFilteredItems([]);
      setFilteredStaticItems([]);
    }
  }, [selectedId, selectedClientID, resourceAccess]);

  return (
    <>
      {filteredStaticItems?.map((item, i) => (
        <Link to={item?.url} className="" key={i}>
          <div className="text-transform: mx-4 mb-3 mt-4 text-[10px] font-medium uppercase text-black dark:text-white">
            {item?.label}
          </div>
        </Link>
      ))}

      <MenuProvider key={menuKey}>
        <ul className="layout-menu">
          {filteredItems?.map((item, i) => {
            return !item?.seperator ? (
              <AppMenuitem item={item} root={true} index={i} key={item.label} />
            ) : (
              <li className="menu-separator" key={i}></li>
            );
          })}
        </ul>
      </MenuProvider>
    </>
  );
};

export default AppMenu;
