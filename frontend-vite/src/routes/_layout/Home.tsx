import {useRef, useState} from "react";
import {useTaskHook} from "~/hooks/useTaskHook.tsx";
import {Task, TaskPriority} from "~/utilities/types/models";
import {taskApi} from "~/service/TaskService.ts";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {ContextMenu} from "primereact/contextmenu";
import {Toolbar} from "primereact/toolbar";
import {DataTable, DataTableRowEvent} from "primereact/datatable";
import {Column} from "primereact/column";
import {format} from "date-fns";
import {ConfirmDialog} from "primereact/confirmdialog";
import {NewTaskDialog} from "~/components/ui/dialog/NewTaskDialog.tsx";
import {createFileRoute} from "@tanstack/react-router";
import "primeflex/themes/primeone-light.css"
import {EditTaskDialog} from "~/components/ui/dialog/EditTaskDialog.tsx";
import {OverlayPanel} from "primereact/overlaypanel";
import {Tag} from "primereact/tag";
import {Avatar} from "primereact/avatar";
import {AvatarGroup} from "primereact/avatargroup";

const Home = () => {
    const [newDialogVisible, setNewDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [task, setTask] = useState<Task | null>(null);
    const {fetchTasks, deleteTask} = useTaskHook();
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef<DataTable<Task[]>>(null);
    const cm = useRef<ContextMenu>(null);

    function hideNewDialog() {
        setNewDialogVisible(false);
    }

    function hideEditDialog() {
        setTask(null); // to reset datatable selection. otherwise it will hold invalidated state
        setEditDialogVisible(false);
    }

    const leftToolbarTemplate = () => {
        return (
            <div className="my-2">
                <Button label="Yeni Kayıt" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew}/>
                <Button label="Sil" icon="pi pi-trash" severity="danger" onClick={() => {
                    setConfirmVisible(true);
                }}/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <>
                <Button label="Export" icon="pi pi-excel" severity="help" onClick={taskApi.exportTasks}/>
            </>
        );
    };
    const items = [
        {label: 'Görüntüle', icon: 'pi pi-eye', command: () => editTask()},
        {label: 'Düzenle', icon: 'pi pi-pencil', command: () => editTask()},
        {label: 'Sil', icon: 'pi pi-trash', command: () => setConfirmVisible(true)}
    ];
    const onRightClick = (event: DataTableRowEvent) => {
        if (cm.current) {
            setTask(event.data);
            cm.current.show(event.originalEvent);
        }
    };
    const editTask = () => {
        setEditDialogVisible(true);
    };
    const openNew = () => {
        setNewDialogVisible(true);
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Görev Yönetimi</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)}
                           placeholder="Search..."/>
            </span>
        </div>
    );
    const priorityColumnBody = (_task: Task) => {
        let label, styleClazz;
        switch (_task.priority) {
            case TaskPriority.High:
                label = 'Yüksek';
                styleClazz = 'bg-red-100 text-red-800';
                break
            case TaskPriority.Medium:
                label = 'Orta';
                styleClazz = 'bg-yellow-100 text-yellow-800';
                break
            case TaskPriority.Low:
                label = 'İkincil';
                styleClazz = 'bg-green-100 text-green-800';
                break
            default:
                label = 'None';
                styleClazz = 'bg-gray-100 text-gray-800';
        }
        return (
            <Tag value={label} className={`${styleClazz}`}/>
        )
    }
    const dateColumnBody = (_task: Task) => {
        if ((typeof _task.dueDate) === 'string')
            return format(new Date(_task.dueDate), "dd.MM.yyyy HH:mm");
        return format(_task.dueDate, "dd.MM.yyyy HH:mm");
    }
    const historyColumnBody = (_task: Task) => {
        const op = useRef(null);
        return <>
            <Button link label={(_task.history ? _task.history.length : 0) + ' değişiklik'}
                    onClick={(e) => op.current.toggle(e)}
                    icon="pi pi-history" disabled={!_task.history || _task.history.length === 0}/>
            <OverlayPanel ref={op}>
                <ul>
                    {_task.history && _task.history.map((comment, index) => (
                        <li key={index}>
                            <div
                                className="flex-shrink-0 w-24 text-[9px] text-gray-500">{format(comment.date, "dd.MM.yyyy HH:mm")}</div>
                            <div className="flex-1">
                                <div className="mt-1 text-[10px] text-gray-500 flex items-center gap-1">
                                    <span>{comment.by}:</span>
                                </div>
                                {comment.note && (
                                    <div className="mt-1 text-[10px] text-gray-600">
                                        {comment.note}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </OverlayPanel>
        </>;
    }
    const avatarColumnBody = (_task: Task) => {
        return (
            <AvatarGroup className="mb-3">
                <Avatar label="+2" shape="circle" size="large"
                        style={{backgroundColor: '#9c27b0', color: '#ffffff'}}></Avatar>
                <Avatar label="NA" size="large" shape="circle"></Avatar>
                <Avatar label="YK" size="large" shape="circle"></Avatar>
            </AvatarGroup>
        );
    }
    return (
        <div className="grid crud-demo">
            <div className="grid crud-demo">
                <ContextMenu ref={cm} model={items}/>
                <div className="col-12">
                    <div className="card">
                        <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}/>

                        <ConfirmDialog group="declarative" visible={confirmVisible}
                                       onHide={() => setConfirmVisible(false)} defaultFocus="reject" acceptLabel="Evet"
                                       rejectLabel="Hayır"
                                       message="Bu kaydı silmek istediğinizden emin misiniz?" header="Silme Onayı"
                                       icon="pi pi-exclamation-triangle" acceptClassName="p-button-danger"
                                       accept={() => {
                                           deleteTask.mutateAsync(task)
                                       }} reject={() => {
                        }}/>
                        <DataTable
                            ref={dt}
                            value={fetchTasks.data}
                            selection={task} selectionMode="single"
                            onRowDoubleClick={() => editTask()}
                            onSelectionChange={(e) => e.value != null && setTask(e.value)}
                            dataKey="id"
                            showGridlines stripedRows paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            globalFilter={globalFilter}
                            tableStyle={{minWidth: '50rem'}}
                            header={header} onContextMenu={(e) => onRightClick(e)}>
                            <Column field="title" header="Tanım" sortable headerStyle={{minWidth: '15rem'}}/>
                            <Column field="priority" header="Öncelik" sortable body={priorityColumnBody}/>
                            <Column field="dueDate" header="Teslim Tarihi" sortable body={dateColumnBody}/>
                            <Column header="Avatar" sortable body={avatarColumnBody}/>
                            <Column field="assignedBy.label" header="Atayan"/>
                            <Column field="assignedTo.label" header="Atanan"/>
                            <Column field="status.label" header="Durumu"/>
                            <Column field="history" header="Geçmiş" body={historyColumnBody}/>
                        </DataTable>
                    </div>
                </div>
                {newDialogVisible ? <NewTaskDialog isVisible={newDialogVisible} hideDialog={hideNewDialog}/> : null}
                {editDialogVisible ?
                    <EditTaskDialog isVisible={editDialogVisible} hideDialog={hideEditDialog} task={task}/> : null}
            </div>
        </div>
    );
};
export const Route = createFileRoute("/_layout/Home")({
    component: Home,
});
export default Home;
