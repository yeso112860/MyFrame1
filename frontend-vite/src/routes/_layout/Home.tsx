import {useFormik} from "formik";
import {useContext, useRef, useState} from "react";
import * as Yup from "yup";
import {LoadingQueueContext} from "~/store/loadingContext.tsx";
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

const Home = () => {
    const {addLoading, removeLoading} = useContext(LoadingQueueContext);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [task, setTask] = useState<Task>(new Task);
    const {fetchStatuses, fetchTasks, newTask, deleteTask, fetchPeople} = useTaskHook();
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef<DataTable<Task[]>>(null);
    const cm = useRef<ContextMenu>(null);

    const validationSchema = Yup.object({
        title: Yup.string().required("Görev Tanımı Zorunlu alan"),
        description: Yup.string().required("Görev Açıklaması Zorunlu alan"),
        dueDate: Yup.string().required("Görev Teslim Tarihi Zorunlu alan"),
        assignedBy: Yup.object().required("Görevi Atayan Zorunlu alan"),
        assignedTo: Yup.object().required("Görev Atanan Zorunlu alan"),
        durum: Yup.object().required("Görev Durumu Zorunlu alan"),
        //durumu: Yup.number().typeError("Servis Versiyonu Alanı sadece sayı olmalıdır"),
    });
    const formik: any = useFormik({
        initialValues: task,
        validateOnMount: true,
        validationSchema: validationSchema || Yup.object({}),
        onSubmit: async (data: Task) => {
            addLoading();
            try {
                await newTask.mutateAsync({...data});
            } catch (error) {
                console.log(error);
            } finally {
                removeLoading();
            }
        },
    });

    //validasyon hata mesajları


    function hideDialog() {
        setDialogVisible(false);
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
        {label: 'Görüntüle', icon: 'pi pi-eye', command: () => editTask(task!)},
        {label: 'Düzenle', icon: 'pi pi-pencil', command: () => editTask(task!)},
        {label: 'Sil', icon: 'pi pi-trash', command: () => setConfirmVisible(true)}
    ];
    const onRightClick = (event: DataTableRowEvent) => {
        if (cm.current) {
            setTask(event.data);
            cm.current.show(event.originalEvent);
        }
    };
    const editTask = (_task: Task) => {
        Object.keys(_task).map(function (keyName, keyIndex) {
            formik.setFieldValue(keyName, _task[keyName], false);
        })
        formik.setFieldValue("dueDate", new Date(_task.dueDate), false);
        setDialogVisible(true);
    };
    const openNew = () => {
        Object.keys(formik.values).map(function (keyName, keyIndex) {
            formik.setFieldValue(keyName, null, false);
        })
        setDialogVisible(true);
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
        let label,styleClazz;
        switch (_task.priority) {
            case TaskPriority.High:
                label = 'Yüksek';
                styleClazz = 'bg-red-100 text-red-800';
                break
            case TaskPriority.Medium:
                label = 'Orta';
                styleClazz =  'bg-yellow-100 text-yellow-800';
                break
            case TaskPriority.Low:
                label = 'İkincil';
                styleClazz =  'bg-green-100 text-green-800';
                break
            default:
                label = 'None';
                styleClazz =  'bg-gray-100 text-gray-800';
        }
        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styleClazz}`}>{label}</span>
        )
    }
    const dateColumnBody = (_task: Task) => {
        if ((typeof _task.dueDate) === 'string')
            return format(new Date(_task.dueDate), "dd.MM.yyyy HH:mm");
        return format(_task.dueDate, "dd.MM.yyyy HH:mm");
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
                            onRowDoubleClick={() => editTask(task!)}
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
                            <Column field="assignedBy.label" header="Atayan"/>
                            <Column field="assignedTo.label" header="Atanan"/>
                            <Column field="status.label" header="Durumu"/>
                        </DataTable>
                    </div>
                </div>
                <NewTaskDialog isVisible={dialogVisible} hideDialog={hideDialog}/>

            </div>
        </div>
    );
};
export const Route = createFileRoute("/_layout/Home")({
    component: Home,
});
export default Home;
