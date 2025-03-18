import {DataTable, DataTableRowEvent} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useEffect, useRef, useState} from "react";
import {Task} from "~/utilities/types";
import {emptyTask, taskApi} from "~/service/TaskService.ts";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import {FileUpload} from "primereact/fileupload";
import {createFileRoute} from "@tanstack/react-router";
import {InputText} from "primereact/inputtext";
import {ContextMenu} from "primereact/contextmenu";
import {Dialog} from "primereact/dialog";
import {Message} from "primereact/message";
import {classNames} from "primereact/utils";
import {InputTextarea} from "primereact/inputtextarea";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {Toast} from "primereact/toast";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import {Calendar} from "primereact/calendar";


const Home = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<Task>(emptyTask);
    const [taskDialog, setTaskDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [readonly, setReadonly] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef<DataTable<Task[]>>(null);
    const toast = useRef<Toast>(null);
    const cm = useRef<ContextMenu>(null);

    /////////////////////////////////////////
    const validationSchema = Yup.object({
        title: Yup.string().required("Başlık Zorunlu Alan"),
        description: Yup.string().required("Duyuru Metni Zorunlu Alan")/*,
        baslamaTarihi: Yup.date().required("Başlama Tarihi Zorunlu Alan"),
        bitisTarihi: Yup.date()
            .required("Bitiş Tarihi Zorunlu Alan")
            .test("is-greater", "Yayından Kaldırılma Tarihi, Yayınlanma Tarihinden önce olamaz.",
                function (value) {
                    const { baslamaTarihi } = this.parent; // `this.parent` diğer alanlara erişim sağlar
                    if (!baslamaTarihi || !value) return true; // Eğer biri boşsa, kontrol yapma
                    return new Date(value) >= new Date(baslamaTarihi); // Tarih karşılaştırması
                },
            ),*/
    });
    const formik: any = useFormik({
        initialValues: emptyTask,
        validationSchema: validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
        onSubmit: async (data: Task) => {
           // addLoading();
            try {
                const newObject = {
                    ...data
                };
                taskApi.saveTask(newObject);
            } catch (error) {
                console.log(error);
            //} finally {
            //    removeLoading();
            }
        },
    });

    /////////////////////////////////////////

    useEffect(() => {
        taskApi.getTasks().then((value) => setTasks(value))
            .catch((error) => setHttpError(error.message))
            .finally(() => setIsLoading(false))
    }, []);
    const openNew = () => {
        setTask(emptyTask);
        setSubmitted(false);
        setTaskDialog(true);
    };
    const items = [
        {label: 'Görüntüle', icon: 'pi pi-eye', command: () => viewTask(task!)},
        {label: 'Düzenle', icon: 'pi pi-pencil', command: () => editTask(task!)}
    ];
    const onRightClick = (event: DataTableRowEvent, task: Task) => {
        if (cm.current) {
            setTask(task);
            cm.current.show(event.originalEvent);
        }
    };
    const hideDialog = () => {
        setSubmitted(false);
        setTaskDialog(false);
    };
    const viewTask = (task: Task) => {
        setReadonly(true);
        setTask(task);
        setTaskDialog(true);
    };
    const editTask = (task: Task) => {
        setReadonly(false);
        setTask(task);
        setTaskDialog(true);
    };
    const findIndexById = (id: string) => {
        return tasks.findIndex(task => task.id === id);
    };
    const saveTask = () => {
        setSubmitted(true);
        if (task != null && task.title && task.title.trim()) {
            const _tasks = [...tasks];
            const _task = {...task};
            if (task.id) {
                const index = findIndexById(task.id);

                _tasks[index] = _task;
                toast.current!.show({
                    severity: "success",
                    summary: "Başarılı",
                    detail: "Görev Güncellendi",
                    life: 3000
                });
            } else {
                _task.id = crypto.randomUUID();
                _tasks.push(_task);
                toast.current!.show({
                    severity: "success",
                    summary: "Başarılı",
                    detail: "Görev Oluşturuldu",
                    life: 3000
                });
            }

            setTasks(_tasks);
            setTaskDialog(false);
            setTask(emptyTask);
            taskApi.saveTask(_task);
        }
    }
    const taskDialogFooter = (
        <React.Fragment>
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
                onClick={saveTask}
            />
        </React.Fragment>
    );
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
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || "";
        const _task: Task | null = {...task};
        // @ts-ignore
        _task[`${name}`] = val;

        setTask(_task);
    };
    const onDropChange = (e: DropdownChangeEvent, name: string) => {
        const val = (e.target && e.target.value) || "";
        const _task: Task | null = {...task};
        // @ts-ignore
        _task[`${name}`] = val;

        setTask(_task);
    };
    const exportCSV = () => {
        dt.current!.exportCSV();
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew}/>
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={() => {
                        console.log("delete");
                    }} disabled={true}/>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import"
                            className="mr-2 inline-block"/>
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV}/>
            </React.Fragment>
        );
    };
    return (<div className="grid crud-demo">
            <Toast ref={toast}/>
            <ContextMenu ref={cm} model={items}/>
            <div className="col-12">
                <div className="card">
                    <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}/>

                    <DataTable
                        ref={dt}
                        value={tasks}
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
            <Dialog
                visible={taskDialog}
                style={{width: "450px"}}
                header="Görev Detayları"
                modal
                className="p-fluid"
                footer={taskDialogFooter}
                onHide={hideDialog}
            >
                <fieldset disabled={readonly}>
                    <div className="field">
                        <label htmlFor="title">Tanımı</label>
                        <InputText
                            id="title"
                            value={task?.title}
                            onChange={(e) => onInputChange(e, "title")}
                            required
                            autoFocus
                            className={classNames({"p-invalid": submitted && !task?.title})}
                        />
                        {submitted && !task?.title && <Message severity="error" text="Tanım girilmelidir"/>}
                    </div>
                    <div className="field">
                        <label htmlFor="description">Açıklaması</label>
                        <InputTextarea
                            id="description"
                            value={task?.description}
                            onChange={(e) => onInputChange(e, "description")}
                            required
                            className={classNames({"p-invalid": submitted && !task?.description})}
                        />
                        {submitted && !task?.description && <Message severity="error" text="Açıklama girilmelidir"/>}
                    </div>
                    <div className="field">
                        <label htmlFor="deadline">Deadline</label>
                        <Calendar
                            id="deadline"
                            value={task?.deadline}
                            onChange={(e) => onInputChange(e, "deadline")}
                            required locale="tr"
                            className={classNames({"p-invalid": submitted && !task?.deadline})}
                        />
                        {submitted && !task?.deadline && <Message severity="error" text="Deadline girilmelidir"/>}
                    </div>
                    <div className="field">
                        <label htmlFor="assignedBy">Atayan</label>
                        <Dropdown id="assignedBy" value={task?.assignedBy} options={taskApi.getPeople()} required optionLabel="label"
                                  filter onChange={(e) => onDropChange(e, "assignedBy")}/>
                        {submitted && !task?.assignedBy && <Message severity="error" text="Atayan seçilmelidir"/>}
                    </div>
                    <div className="field">
                        <label htmlFor="assignedTo">Atanan</label>
                        <Dropdown id="assignedTo" value={task?.assignedTo} options={taskApi.getPeople()} required optionLabel="label"
                                  filter onChange={(e) => onDropChange(e, "assignedTo")}/>
                        {submitted && !task?.assignedTo && <Message severity="error" text="Atanan seçilmelidir"/>}
                    </div>
                    <div className="field">
                        <label htmlFor="durum">Durumu</label>
                        <Dropdown id="durum" value={task?.durum} options={taskApi.getDurumlar()} required optionLabel="label"
                                  onChange={(e) => onDropChange(e, "durum")}/>
                        {submitted && !task?.durum && <Message severity="error" text="Durumu seçilmelidir"/>}
                    </div>
                </fieldset>
            </Dialog>
        </div>
    );
};
export const Route = createFileRoute("/_layout/Home_bck")({
    component: Home,
});
export default Home;
