import {AppMenuItem} from "@/utilities/types";

export function getMenu(): AppMenuItem[] {
    return [
        {
            label: "Menü 1",
            items: [
                {
                    label: "Home Admin",
                    icon: "pi pi-cloud-upload",
                    url: "/Home",
                     roles: ["ADMIN"],
                },
                {
                    label: "Home User",
                    icon: "pi pi-cloud-upload",
                    url: "/Home",
                     roles: ["USER"],
                },
            ],
        },
        {
            label: "Menü 2",
            items: [
                {
                    label: "Playground Admin",
                    icon: "pi pi-cloud-upload",
                    url: "/Playground",
                    roles: ["ADMIN"],
                },
                {
                    label: "Playground User",
                    icon: "pi pi-cloud-upload",
                    url: "/Playground",
                    roles: ["USER"],
                },
            ],
        }
    ];
}

export function getStaticMenu() {
    return [
        {
            url: "/",
            label: "Anasayfa",
            roles: ["USER"],
        }
    ];
}
