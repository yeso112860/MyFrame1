import {useEffect, useState} from "react";
import {createFileRoute} from "@tanstack/react-router";
import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {useHistoryHook} from "~/hooks/useHistoryHook.tsx";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {Column} from "primereact/column";
import ErrorPage from "~/routes/_no-layout/ErrorPage.tsx";


const HistoryPage = () => {
    const {id, path} = Route.useParams();
    const {getHistoryById} = useHistoryHook();
    const [data, setdata] = useState<any>(null);
    const [header, setHeader] = useState<string>("");

    useEffect(() => {
        if (path) {
            setHeader("Görev");
            getHistoryById.mutate(
                {id: id, path: path},
                {
                    onSuccess: (json) => {
                        setdata(json?.data);
                    },
                },
            );
        }
    }, [path]);

    const rowExtensionTemplate = (rowData)=> {
        const foo = data.find((x) => {
            return x.version === rowData.version;
        })?.changeValues;
        const changes = data.find((x) => {
            return x.version === rowData.version;
        })?.changes;
        return <DynamicTable changeValues={foo} changes={changes}/>;
    }

    const [expandedRows, setExpandedRows] = useState(null);

    const expandAll = () => {
        //versiyon'a göre satır açma işlemleri yapılmalı data'nın id'leri ortak
        if (data) {
            const _expandedRows = data.reduce((acc, item) => {
                acc[item.version] = true;
                return acc;
            }, {});
            setExpandedRows(_expandedRows);
        }
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const headerComp = (
        <div className="justify-content-end flex flex-wrap gap-2">
            <Button
                icon="pi pi-plus"
                label={"Tümünü Genişlet"}
                onClick={expandAll}
                text
            />
            <Button
                icon="pi pi-minus"
                label={"Tümünü Kapat"}
                onClick={collapseAll}
                text
            />
        </div>
    );

    return (
        <>
            <div className="grid">
                <div className="col-12">
                    <Card title="">
                        <h5>{`${header} Tarihçe`}</h5>
                        <Divider/>
                        <DataTable
                            value={data}
                            stripedRows
                            showGridlines
                            tableStyle={{ minWidth: "50rem" }}
                            expandedRows={expandedRows}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            rowExpansionTemplate={rowExtensionTemplate}
                            dataKey="version"
                            header={headerComp}
                        >
                            <Column expander style={{width: "3em"}}/>
                            <Column field="id" header="Id"/>
                            <Column field="version" header="Version" align={"center"}/>
                            <Column field="type" header="Type"/>
                            <Column field="author" header="Author"/>
                            <Column field="date" header="Date"/>
                        </DataTable>
                    </Card>
                </div>
            </div>
        </>
    );
}

const DynamicTable = ({changeValues, changes})=> {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (changeValues && changes) {
            try {
                const parsedData = JSON.parse(changeValues);
                const properties = parsedData.properties;
                const keys = Object.keys(properties);

                // Filter columns based on changes array
                const filteredKeys = keys.filter((key) => changes.includes(key));

                // Generate columns
                const cols = filteredKeys.map((key) => ({
                    field: key,
                    header: key.charAt(0).toUpperCase() + key.slice(1),
                }));
                setColumns(cols);

                // Populate data with filtered properties
                const filteredData = filteredKeys.reduce((obj, key) => {
                    obj[key] = properties[key];
                    return obj;
                }, {});
                setData([filteredData]);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    }, [changeValues, changes]);

    return (
        <div>
            {columns.map((col, index) => (
                <div key={index} style={{marginBottom: "1rem"}}>
                    <strong>{col.header}:</strong> {JSON.stringify(data[0][col.field])}
                </div>
            ))}
        </div>
    );
}


export const Route = createFileRoute("/_layout/history/index/$path/$id")({
    component: HistoryPage,
    errorComponent: ErrorPage,
});
