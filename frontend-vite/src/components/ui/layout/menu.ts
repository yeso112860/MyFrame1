import {AppMenuItem} from "~/utilities/types";

export function getMenu(): AppMenuItem[] {
    return [
        {
            label: 'Anasayfa',
            items: [{label: 'Anasayfa', icon: 'pi pi-fw pi-home', to: '/Home'}]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {label: 'Error', icon: 'pi pi-times-circle', to: '/ErrorPage'},
                {label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/AccessDenied'},
                {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound'},
                {label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty'}
            ]
        },
    ];
}
