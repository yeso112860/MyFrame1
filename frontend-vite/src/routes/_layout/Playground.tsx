import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {useAuth} from 'react-oidc-context';
import {IKullanici} from "~/utilities/types";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {jwtDecode} from "jwt-decode";
import {MultiSelect} from "primereact/multiselect";
import {useToast} from "~/store/toastContext.tsx";
import {createFileRoute} from "@tanstack/react-router";
import useMasterContext from "~/store/masterContext.tsx";


const API_PATH_PREFIX = import.meta.env.DEV ? 'api' : import.meta.env.VITE_BACKEND_BASE_URL;

const API_PATH = '/api/changeit/user';

const Playground = () => {
    const masterContext: any = useMasterContext();
    useEffect(() => {
        masterContext.setRouterContext({
            label: "Playground",
            key: "playground",
            parentKey: "playground",
            path: "/Playground",
            isNavigatable: true,
        });
    }, []);
    const auth = useAuth();
    const accessToken = auth.user?.access_token ?? '';
    const showToast = useToast();

    const {isPending, error, data, refetch} = useQuery({
        queryKey: ['Test'],
        retry: false,
        queryFn: async () => {
            const jwtPayload = jwtDecode(accessToken);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (!jwtPayload?.resource_access['movies-app']?.roles.includes('ADMIN')) {
                showToast("error","Yetki yok","Admin yetkisi lazım");
                return [];
            }

            const headers: Record<string, string> = {authorization: `Bearer ${accessToken}`};
            const response = await fetch(API_PATH_PREFIX + API_PATH, {headers: headers});
            console.debug(`Querying API '${API_PATH}' with token: ${accessToken}`);

            if (!response.ok) {
                throw new Error(
                    `Failed to query API '${API_PATH}': ${response.status} - ${response.statusText}\n
        Www-Authenticate: ${response.headers.get('www-authenticate')}`
                );
            }
            return await response.json();
        }
    });

    useEffect(() => {
        refetch();
    }, [refetch]);


    const columns = [
        {field: "id", header: "Id", hidden: true},
        {field: "firstName", header: "Adı", filter: true, sortable: true,},
        {field: "lastName", header: "Soyadı", filter: true, sortable: true},
        {field: "email", header: "e-Posta"},
        {field: "phone", header: "Telefon"},
        {field: "bio", header: "Öz Geçmiş"},
        {
            field: "imageUrl", header: "Resim", body: (item: IKullanici) => {
                return <img src={item.imageUrl} alt={item.bio}
                            className="w-6rem shadow-2 border-round"/>
            }
        },
    ];
    const [visibleColumns, setVisibleColumns] = useState(columns);
    return (
        <>
            {isPending ? 'Loading' : error ? 'Error ' + error.message :
                <>
                    <DataTable value={data} header={
                        <MultiSelect value={visibleColumns} options={columns} optionLabel="header"
                                     onChange={(event) => {
                                         const selectedColumns = event.value;
                                         const orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));
                                         setVisibleColumns(orderedSelectedColumns);
                                     }}
                                     className="w-full sm:w-20rem" display="comma"/>}>
                        {visibleColumns.map((col, i) => (
                            <Column key={i} field={col.field} header={col.header} sortable={col.sortable}
                                    filter={col.filter} body={col.body}/>
                        ))}
                    </DataTable>
                </>
            }
        </>
    );
};

export const Route = createFileRoute("/_layout/Playground")({
    component: Playground,
});

export default Playground;
