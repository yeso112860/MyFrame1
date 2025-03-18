import {useFormik} from "formik";
import React, {useContext, useRef, useState} from "react";
import * as Yup from "yup";
import {LoadingQueueContext} from "~/store/loadingContext.tsx";
import {useTaskHook} from "~/hooks/useTaskHook.tsx";
import {Task} from "~/utilities/types";
import {emptyTask} from "~/service/TaskService.ts";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {FileUpload} from "primereact/fileupload";
import {ContextMenu} from "primereact/contextmenu";
import {Toolbar} from "primereact/toolbar";
import {DataTable, DataTableRowEvent} from "primereact/datatable";
import {Column} from "primereact/column";
import {createFileRoute} from "@tanstack/react-router";

const Home2 = () => {
    const {addLoading, removeLoading} = useContext(LoadingQueueContext);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [task, setTask] = useState<Task>(emptyTask);
    const {fetchDurumlar, fetchTasks, newTask, fetchPeople} = useTaskHook();
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef<DataTable<Task[]>>(null);
    const cm = useRef<ContextMenu>(null);

    const validationSchema = Yup.object({
        title: Yup.string().required("Harita Servis Adı Zorunlu alan"),
        description: Yup.string().required("Harita Servis Adı Zorunlu alan"),
        deadline: Yup.date().required("Deadline Zorunlu alan"),
        assignedBy: Yup.object().required("Harita Tipi Zorunlu alan"),
        assignedTo: Yup.object().required("URL Zorunlu alan"),
        durum: Yup.object().typeError("Servis Versiyonu Alanı sadece sayı olmalıdır"),
    });
    const formik: any = useFormik({
        initialValues: emptyTask,
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
                type="submit"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => {
                    formik.handleSubmit();
                    hideDialog();
                }}
            />
        </>
    );
    const openNew = () => {
        setDialogVisible(true);
    };
    const leftToolbarTemplate = () => {
        return (
            <div className="my-2">
                <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew}/>
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={() => {
                    console.log("delete");
                }} disabled={true}/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import"
                            className="mr-2 inline-block"/>
            </React.Fragment>
        );
    };
    const items = [
        {label: 'Görüntüle', icon: 'pi pi-eye', command: () => editTask(task!)},
        {label: 'Düzenle', icon: 'pi pi-pencil', command: () => editTask(task!)}
    ];
    const onRightClick = (event: DataTableRowEvent, task: Task) => {
        if (cm.current) {
            setTask(task);
            cm.current.show(event.originalEvent);
        }
    };
    const editTask = (task: Task) => {
        setTask(task);
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
    return (
        <div className="grid crud-demo">
            <div className="grid crud-demo">
                <ContextMenu ref={cm} model={items}/>
                <div className="col-12">
                    <div className="card">
                        <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}/>

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
                            header={header} onContextMenu={(e) => onRightClick(e, e.data)}>
                            <Column field="title" header="Tanım" sortable headerStyle={{minWidth: '15rem'}}/>
                            <Column field="description" header="Açıklama" sortable headerStyle={{minWidth: '15rem'}}/>
                            <Column field="deadline" header="Deadline" sortable/>
                            <Column field="assignedBy.label" header="Atayan"/>
                            <Column field="assignedTo.label" header="Atanan"/>
                            <Column field="durum.label" header="Durumu"/>
                        </DataTable>
                    </div>
                </div>
                <form>
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
                                onChange={(e) => formik.setFieldValue("title", e.target.value)}
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
                                onChange={(e) => formik.setFieldValue("description", e.target.value)}
                                required
                                className={classNames("w-full", {"p-invalid": isFormFieldInvalid("description")})}
                            />{getFormErrorMessage("title")}
                        </div>
                        <div className="field">
                            <label htmlFor="deadline">Deadline</label>
                            <Calendar
                                id="deadline"
                                value={formik.values?.deadline}
                                onChange={(e) => formik.setFieldValue("description", e.target.value)}
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
                                      filter onChange={(e) => formik.setFieldValue("description", e.target.value)}/>
                            {getFormErrorMessage("assignedBy")}
                        </div>
                        <div className="field">
                            <label htmlFor="assignedTo">Atanan</label>
                            <Dropdown id="assignedTo" value={formik.values?.assignedTo} options={fetchPeople.data}
                                      required
                                      optionLabel="label"
                                      className={classNames("w-full", {"p-invalid": isFormFieldInvalid("assignedTo")})}
                                      filter onChange={(e) => formik.setFieldValue("description", e.target.value)}/>
                            {getFormErrorMessage("assignedTo")}
                        </div>
                        <div className="field">
                            <label htmlFor="durum">Durumu</label>
                            <Dropdown id="durum" value={formik.values?.durum} options={fetchDurumlar.data} required
                                      optionLabel="label"
                                      className={classNames("w-full", {"p-invalid": isFormFieldInvalid("durum")})}
                                      onChange={(e) => formik.setFieldValue("description", e.target.value)}/>
                            {getFormErrorMessage("durum")}
                        </div>
                    </Dialog>
                </form>
            </div>
        </div>
    );
};
export const Route = createFileRoute("/_layout/Home2")({
    component: Home2,
});
export default Home2;
