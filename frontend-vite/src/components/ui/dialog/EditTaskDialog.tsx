import { useFormik } from "formik"
import * as Yup from "yup";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog"
import Task from "~/utilities/types/models";
import { LoadingQueueContext } from "~/store/loadingContext";
import { useContext } from "react";
import { useTaskHook } from "~/hooks/useTaskHook";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

interface TaskDialogProps {
    isVisible: boolean
    hideDialog: () => void
}

export const EditTaskDialog = ({ isVisible, hideDialog }: TaskDialogProps) => {
    const { addLoading, removeLoading } = useContext(LoadingQueueContext);
    const { fetchStatuses, fetchTasks, newTask, deleteTask, fetchPeople } = useTaskHook();
    const validationSchema = Yup.object({
        title: Yup.string().required("Görev Tanımı Zorunlu alan"),
        description: Yup.string().required("Görev Açıklaması Zorunlu alan"),
        dueDate: Yup.string().required("Görev Teslim Tarihi Zorunlu alan"),
        assignedBy: Yup.object().required("Görevi Atayan Zorunlu alan"),
        assignedTo: Yup.object().required("Görev Atanan Zorunlu alan"),
        status: Yup.object().required("Görev Durumu Zorunlu alan"),
        //status: Yup.number().typeError("Servis Versiyonu Alanı sadece sayı olmalıdır"),
    });
    const formik = useFormik({
        initialValues: new Task(),
        validateOnMount: true,
        validationSchema: validationSchema || Yup.object({}),
        onSubmit: async (data: Task) => {
            addLoading();
            try {
                await newTask.mutateAsync({ ...data });
            } catch (error) {
                console.log(error);
            } finally {
                removeLoading();
            }
        },
    })
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

    return <Dialog
        id="taskDialog"
        key="taskDialog"
        footer={taskDialogFooter}
        visible={isVisible}
        onHide={hideDialog}>
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
                        <label htmlFor="dueDate">Teslim Tarihi</label>
                        <Calendar
                            id="dueDate" showTime
                            value={formik.values?.dueDate}
                            onChange={formik.handleChange}
                            required locale="tr"
                            className={classNames("w-full", {"p-invalid": isFormFieldInvalid("dueDate")})}
                        />{getFormErrorMessage("dueDate")}
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
                        <label htmlFor="status">Durumu</label>
                        <Dropdown id="status" value={formik.values?.status} options={fetchStatuses.data} required
                                  optionLabel="label"
                                  className={classNames("w-full", {"p-invalid": isFormFieldInvalid("status")})}
                                  onChange={formik.handleChange}/>
                        {getFormErrorMessage("status")}
                    </div>
    </Dialog>
}