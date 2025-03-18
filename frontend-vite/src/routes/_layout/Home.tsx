import {useFormik} from "formik";
import React, {useContext, useRef, useState} from "react";
import * as Yup from "yup";
import {LoadingQueueContext} from "~/store/loadingContext.tsx";
import {useTaskHook} from "~/hooks/useTaskHook.tsx";
import {Task} from "~/utilities/types";
import {emptyTask, taskApi} from "~/service/TaskService.ts";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {ContextMenu} from "primereact/contextmenu";
import {Toolbar} from "primereact/toolbar";
import {DataTable, DataTableRowEvent} from "primereact/datatable";
import {Column} from "primereact/column";
import {createFileRoute} from "@tanstack/react-router";
import {dateFormatterBackend} from "~/utilities/formatter.ts";
import { format, parse } from "date-fns";
import { ConfirmDialog } from "primereact/confirmdialog";

const Home = () => {
    const {addLoading, removeLoading} = useContext(LoadingQueueContext);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [task, setTask] = useState<Task>(emptyTask);
    const {fetchDurumlar, fetchTasks, newTask, deleteTask, fetchPeople} = useTaskHook();
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef<DataTable<Task[]>>(null);
    const cm = useRef<ContextMenu>(null);

    const validationSchema = Yup.object({
        title: Yup.string().required("Görev Tanımı Zorunlu alan"),
        description: Yup.string().required("Görev Açıklaması Zorunlu alan"),
        deadline: Yup.string().required("Görev Deadline Zorunlu alan"),
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
    const isFormFieldInvalid = (name: string) =>
        !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: string) => {
        return isFormFieldInvalid(name) ? (
            <small className="p-error">{formik.errors[name]}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };

    function hideDialog() {
        setDialogVisible(false);
    }

    const taskDialogFooter = (
        <>
            <Button
                label="İptal"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />
            <Button
                label="Kaydet"
                icon="pi pi-check"
                className="p-button-text"
                type="submit"
                onClick={() => {
                    formik.handleSubmit();
                    if (Object.keys(formik.errors).length == 0) hideDialog();
                }}
            />
        </>
    );
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
                <Button label="Export" icon="pi pi-excel" severity="help" onClick={taskApi.exportTasks} />
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
        formik.setFieldValue("deadline",new Date(_task.deadline),false );
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
    const dateColumnBody = (_task:Task) => {
        if((typeof _task.deadline ) === 'string')
            return format(new Date(_task.deadline),"dd.MM.yyyy HH:mm");
        return format(_task.deadline,"dd.MM.yyyy HH:mm");
    }
    return (
        <div className="grid crud-demo">
            <div className="grid crud-demo">
                <ContextMenu ref={cm} model={items}/>
                <div className="col-12">
                    <div className="card">
                        <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}/>

                        <ConfirmDialog group="declarative"  visible={confirmVisible} onHide={() => setConfirmVisible(false)} defaultFocus="reject" acceptLabel="Evet"
                            rejectLabel="Hayır"
                            message="Bu kaydı silmek istediğinizden emin misiniz?" header="Silme Onayı" icon="pi pi-exclamation-triangle" acceptClassName="p-button-danger"
                            accept={() => {deleteTask.mutateAsync(task)}} reject={ ()=>{}} />
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
                            <Column field="description" header="Açıklama" sortable headerStyle={{minWidth: '15rem'}}/>
                            <Column field="deadline" header="Deadline" sortable body={dateColumnBody}/>
                            <Column field="assignedBy.label" header="Atayan"/>
                            <Column field="assignedTo.label" header="Atanan"/>
                            <Column field="durum.label" header="Durumu"/>
                        </DataTable>
                    </div>
                </div>
                <Dialog
                    id="taskDialog"
                    key="taskDialog"
                    visible={dialogVisible}
                    style={{width: "450px"}}
                    header="Onay"
                    modal
                    footer={taskDialogFooter}
                    onHide={hideDialog}
                >
                    <div className="field">
                        <label htmlFor="title">Tanımı</label>
                        <InputText
                            id="title"
                            value={formik.values?.title}
                            onChange={formik.handleChange}
                            required
                            autoFocus
                            className={classNames("w-full", {"p-invalid": isFormFieldInvalid("title")})}
                        />{getFormErrorMessage("title")}
                    </div>
                    <div className="field">
                        <label htmlFor="description">Açıklaması</label>
                        <InputTextarea
                            id="description"
                            value={formik.values?.description}
                            onChange={formik.handleChange}
                            required
                            className={classNames("w-full", {"p-invalid": isFormFieldInvalid("description")})}
                        />{getFormErrorMessage("description")}
                    </div>
                    <div className="field">
                        <label htmlFor="deadline">Deadline</label>
                        <Calendar
                            id="deadline" showTime
                            value={formik.values?.deadline}
                            onChange={formik.handleChange}
                            required locale="tr"
                            className={classNames("w-full", {"p-invalid": isFormFieldInvalid("deadline")})}
                        />{getFormErrorMessage("deadline")}
                    </div>
                    <div className="field">
                        <label htmlFor="assignedBy">Atayan</label>
                        <Dropdown id="assignedBy" value={formik.values?.assignedBy} options={fetchPeople.data}
                                  required
                                  optionLabel="label"
                                  className={classNames("w-full", {"p-invalid": isFormFieldInvalid("assignedBy")})}
                                  filter onChange={formik.handleChange}/>
                        {getFormErrorMessage("assignedBy")}
                    </div>
                    <div className="field">
                        <label htmlFor="assignedTo">Atanan</label>
                        <Dropdown id="assignedTo" value={formik.values?.assignedTo} options={fetchPeople.data}
                                  required
                                  optionLabel="label"
                                  className={classNames("w-full", {"p-invalid": isFormFieldInvalid("assignedTo")})}
                                  filter onChange={formik.handleChange}/>
                        {getFormErrorMessage("assignedTo")}
                    </div>
                    <div className="field">
                        <label htmlFor="durum">Durumu</label>
                        <Dropdown id="durum" value={formik.values?.durum} options={fetchDurumlar.data} required
                                  optionLabel="label"
                                  className={classNames("w-full", {"p-invalid": isFormFieldInvalid("durum")})}
                                  onChange={formik.handleChange}/>
                        {getFormErrorMessage("durum")}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};
export const Route = createFileRoute("/_layout/Home")({
    component: Home,
});
export default Home;
