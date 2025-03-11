import {useAuth} from 'react-oidc-context';
import {useQuery} from "@tanstack/react-query";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useEffect} from "react";
import {IItem} from "../../utilities/types";
import {createFileRoute} from "@tanstack/react-router";
import useMasterContext from "../../store/masterContext.tsx";

const API_PATH_PREFIX = import.meta.env.DEV ? 'api' : import.meta.env.VITE_BACKEND_BASE_URL;

const Home = () => {
    const masterContext: any = useMasterContext();
    useEffect(() => {
        masterContext.setRouterContext({
            label: "Home Page",
            key: "anasayfa",
            parentKey: "anasayfa",
            path: "/Home",
            isNavigatable: true,
        });
    }, []);
    const auth = useAuth();
    const initalialAccessToken = auth.user?.access_token ?? '';

    const apiPath = '/api/changeit';

    const {isPending, error, data, refetch} = useQuery({
        queryKey: ['Items'],
        retry: false,
        queryFn: async (): Promise<Array<IItem>> => {
            const headers: Record<string, string> = {authorization: `Bearer ${initalialAccessToken}`};
            const response = await fetch(API_PATH_PREFIX + apiPath, {headers: headers});
            console.debug(`Querying API '${apiPath}' with token: ${initalialAccessToken}`);

            if (!response.ok) {
                throw new Error(
                    `Failed to query API '${apiPath}': ${response.status} - ${response.statusText}\n
        Www-Authenticate: ${response.headers.get('www-authenticate')}`
                );
            }
            return await response.json();
        }
    });
    useEffect(() => {
        refetch();
    }, [refetch]);
    return (<>
        {isPending ? 'loading...' : error ? 'Error ' + error.message :
            <DataTable value={data}>
                <Column header="Başlık" field="title"/>
                <Column header="Açıklama" field="description"/>
                <Column header="Yazar" field="author"/>
                <Column header="Yayınevi" field="publisher"/>
                <Column header="Resim"
                        body={(item: IItem) => <img src={item.imageUrl} alt={item.description}
                                                    className="w-6rem shadow-2 border-round"/>}/>
            </DataTable>
        }
    </>);
};
export const Route = createFileRoute("/_layout/Home")({
    component: Home,
});
export default Home;
