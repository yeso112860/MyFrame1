import {BreadCrumb} from "primereact/breadcrumb";
import {Link} from "@tanstack/react-router";
import useMasterContext from "~/store/masterContext";

export default function Breadcrumb() {
    const masterContext: any = useMasterContext();
    const routeObject: any = masterContext.routerContext;

    if (!routeObject) {
        return <></>;
    }

    let routeArray: any = [];
    routeArray.push(routeObject);
    for (let i = 0; ; i++) {
        if (routeArray[i].parentKey === "") {
            break;
        }
        const parentRoute = routeHierarchy.filter(
            (x) => x.key === routeArray[i].parentKey,
        );

        if (parentRoute.length > 0) {
            routeArray.push(parentRoute[0]);
        } else {
            break;
        }
    }

    // set each items path to recursive path
    routeArray = routeArray.reverse().map((value, index) => {
        let path = "";
        for (let i = 0; i <= index; i++) {
            path += "/" + routeArray[i].path;
        }
        return {...value, path: path};
    });

    const items = routeArray.map((value, index) => {
        if (value.isNavigatable) {
            return {
                template: () => (
                    <Link
                        to={value.path + (value.routeParams ? "/" + value.routeParams : "")}
                    >
                        <p className={"text-black dark:text-white"}>{value.label}</p>
                    </Link>
                ),
            };
        } else {
            return {
                template: () => (
                    <p className={"text-black dark:text-white"}>{value.label}</p>
                ),
            };
        }
    });

    const home = {icon: "pi pi-home", url: "/"};

    return <><BreadCrumb model={items} home={home} className="mb-2"/></>;
}

const routeHierarchy = [
    {
        label: "Dashboard",
        key: "dashboard",
        parentKey: "",
        path: "dashboard",
        isNavigatable: true,
    },
    {
        label: "Metaveri Listesi",
        key: "metadata",
        parentKey: "",
        path: "metadata",
        isNavigatable: true,
    },
    {
        label: "Genel Rapor Parametre Listesi",
        key: "genel-rapor-parametre",
        parentKey: "tema-islemleri",
        path: "genel-rapor-parametre",
        isNavigatable: true,
    },
    {
        label: "Harvest Listesi",
        key: "harvest",
        parentKey: "metaveri-yonetimi",
        path: "harvest",
        isNavigatable: true,
    },
    {
        label: "Harvest Log Listesi",
        key: "harvest-log",
        parentKey: "harvest",
        path: "harvest-log",
        isNavigatable: false,
    },
    {
        label: "Servis Listesi",
        key: "servis-listesi",
        parentKey: "servis-yonetimi",
        path: "servis-bilgileri-kontrol",
        isNavigatable: true,
    },
    {
        label: "Servis Yönetimi",
        key: "servis-yonetimi",
        parentKey: "metaveri-yonetimi",
        path: "",
        isNavigatable: false,
    },
    {
        label: "Metaveri Oluşturma İşlemleri",
        key: "choose-create",
        parentKey: "metadata",
        path: "choose-create",
        isNavigatable: true,
    },
    {
        label: "Yönetim Paneli",
        key: "administration",
        parentKey: "",
        path: "administration",
        isNavigatable: false,
    },
    {
        label: "Kavramsal Şema Tanımları",
        key: "tema-islemleri",
        parentKey: "administration",
        path: "tema-islemleri",
        isNavigatable: false,
    },
    {
        label: "Ulusal Coğrafi Veri Sorumluluk Matrisi Listesi",
        key: "veri-sorumluluk-matrisi",
        parentKey: "administration",
        path: "veri-sorumluluk-matrisi",
        isNavigatable: true,
    },
    {
        label: "Veri Kalitesi Listesi",
        key: "veri-kalitesi",
        parentKey: "tema-islemleri",
        path: "veri-kalitesi",
        isNavigatable: true,
    },
    {
        label: "Tema Listesi",
        key: "tema",
        parentKey: "tema-islemleri",
        path: "tema",
        isNavigatable: true,
    },
    {
        label: "Metaveri Organizasyon Rol Listesi",
        key: "metaveri-organizasyon-rol",
        parentKey: "tema-islemleri",
        path: "metaveri-organizasyon-rol",
        isNavigatable: true,
    },
    {
        label: "Metaveri Erişim Kısıt/Şart Listesi",
        key: "metaveri-erisim-kisit-sart",
        parentKey: "tema-islemleri",
        path: "metaveri-erisim-kisit-sart",
        isNavigatable: true,
    },
    {
        label: "Metaveri Dil Listesi",
        key: "metaveri-dil",
        parentKey: "tema-islemleri",
        path: "metaveri-dil",
        isNavigatable: true,
    },
    {
        label: "Metaveri Anahtar Kelime Listesi",
        key: "metaveri-anahtar-kelime",
        parentKey: "tema-islemleri",
        path: "metaveri-anahtar-kelime",
        isNavigatable: true,
    },
    {
        label: "Katman Listesi",
        key: "katman",
        parentKey: "tema-islemleri",
        path: "katman",
        isNavigatable: true,
    },
    {
        label: "Katalog Listesi",
        key: "katalog",
        parentKey: "tema-islemleri",
        path: "katalog",
        isNavigatable: true,
    },
    {
        label: "yonetimPaneli.kavramsalSemaTanimlari.altTemaListesi.altTemaListesi",
        key: "alt-tema",
        parentKey: "tema-islemleri",
        path: "alt-tema",
        isNavigatable: true,
    },
    {
        label: "Tanım İşlemleri",
        key: "tanim-islemleri",
        parentKey: "administration",
        path: "tanim-islemleri",
        isNavigatable: false,
    },
    {
        label: "Tanım Tipi Listesi",
        key: "tanimTipi",
        parentKey: "tanim-islemleri",
        path: "tanimTipi",
        isNavigatable: true,
    },
    {
        label: "Kullanıcı Yönetimi",
        key: "kullanici-yonetimi",
        parentKey: "administration",
        path: "kullanici-yonetimi",
        isNavigatable: false,
    },
    {
        label: "Kurum Listesi",
        key: "kurum",
        parentKey: "kullanici-yonetimi",
        path: "kurum",
        isNavigatable: true,
    },
    {
        label: "Firma Listesi",
        key: "firma",
        parentKey: "kullanici-yonetimi",
        path: "firma",
        isNavigatable: true,
    },
    {
        label: "Yetki Başvuru Listesi",
        key: "yetki-basvuru-listesi",
        parentKey: "kullanici-yonetimi",
        path: "yetki-basvuru-listesi",
        isNavigatable: true,
    },
    {
        label: "Kullanıcı İşlemleri",
        key: "kullanici-islemleri",
        parentKey: "administration",
        path: "kullanici-islemleri",
        isNavigatable: false,
    },
    {
        label: "Kullanıcılar",
        key: "users",
        parentKey: "kullanici-islemleri",
        path: "users",
        isNavigatable: true,
    },
    {
        label: "Katman Öznitelik Listesi",
        key: "katman-oznitelik",
        parentKey: "tema-islemleri",
        path: "katman-oznitelik",
        isNavigatable: false,
    },
    {
        label: "Profil",
        key: "profile",
        parentKey: "users",
        path: "profile",
        isNavigatable: true,
    },
    {
        label: "Ulusal Coğrafi Veri Paylaşım Matrisi Listesi",
        key: "veri-paylasim-matrisi",
        parentKey: "administration",
        path: "veri-paylasim-matrisi",
        isNavigatable: true,
    },
    {
        label: "Altlık Harita Listesi",
        key: "altlik-harita",
        parentKey: "harita-yonetimi",
        path: "altlik-harita",
        isNavigatable: true,
    },
    {
        label: "Harita Yönetimi",
        key: "harita-yonetimi",
        parentKey: "administration",
        path: "harita-yonetimi",
        isNavigatable: false,
    },
    {
        label: "Coğrafi Veri Talep",
        key: "cografi-veri-talep",
        parentKey: "",
        path: "",
        isNavigatable: false,
    },
    {
        label: "Metaveri Yönetimi",
        key: "metaveri-yonetimi",
        parentKey: "",
        path: "metadata",
        isNavigatable: false,
    },
    {
        label: "Taleplerim",
        key: "projeListesi",
        parentKey: "cografi-veri-talep",
        path: "/cografi-veri-talep/projelerim",
        isNavigatable: true,
    },
    {
        label: "Kurum İzni Onay İşlemleri",
        key: "katman-talep-onay",
        parentKey: "cografi-veri-talep",
        path: "/cografi-veri-talep/katman-talep-onay-islemleri",
        isNavigatable: true,
    },
    {
        label: "Proje Talep Onay Listesi",
        key: "proje-talep-onay",
        parentKey: "cografi-veri-talep",
        path: "/cografi-veri-talep/proje-talep-onay-islemleri",
        isNavigatable: true,
    },
    {
        label: "Duyuru Yönetimi",
        key: "duyuruYonetimi",
        parentKey: "administration",
        path: "/duyuru",
        isNavigatable: true,
    },
    {
        label: "Genel Duyurular",
        key: "genelDuyurular",
        parentKey: "duyuruYonetimi",
        path: "/genel-duyurular",
        isNavigatable: true,
    },
    {
        label: "Katman Bazında Rapor",
        key: "katmanBazindaRapor",
        parentKey: "cografi-veri-talep",
        path: "/cografi-veri-talep/katman-bazinda-rapor",
        isNavigatable: true,
    },
    {
        label: "Kurum/Firma Kullanıcı Listesi",
        key: "kurumFirmaKullanıcıListesi",
        parentKey: "",
        path: "/administration/kullanici-yonetimi/kurum-firma-yetkilendirme",
        isNavigatable: true,
    },
];
