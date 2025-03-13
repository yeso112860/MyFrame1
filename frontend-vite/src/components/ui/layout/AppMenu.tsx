import { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from '~/store/layoutcontext';
import { MenuProvider } from '~/store/menucontext';
import { getMenu } from "./menu.ts";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {getMenu().map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
