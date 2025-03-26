import {useFormik} from "formik"
import * as Yup from "yup";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog"
import {Comment, Task, TaskPriority} from "~/utilities/types/models";
import {LoadingQueueContext} from "~/store/loadingContext";
import {useContext, useState} from "react";
import {useTaskHook} from "~/hooks/useTaskHook";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {classNames} from "primereact/utils";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {SelectButton} from "primereact/selectbutton";
import {Slider} from "primereact/slider";
import {format} from "date-fns";
import {TabPanel, TabView} from "primereact/tabview";

interface TaskDialogProps {
    isVisible: boolean
    task: Task
    hideDialog: () => void
}

export const EditTaskDialog = ({isVisible, hideDialog, task}: TaskDialogProps) => {
    const {addLoading, removeLoading} = useContext(LoadingQueueContext);
    const {fetchStatuses, newTask, fetchPeople} = useTaskHook();
    const [newComment, setNewComment] = useState<string>('');
    const validationSchema = Yup.object({
        priority: Yup.string().required("Görev Önceliği Zorunlu alan"),
        title: Yup.string().required("Görev Tanımı Zorunlu alan"),
        description: Yup.string().required("Görev Açıklaması Zorunlu alan"),
        dueDate: Yup.string().required("Görev Teslim Tarihi Zorunlu alan"),
        assignedBy: Yup.object().required("Görevi Atayan Zorunlu alan"),
        assignedTo: Yup.object().required("Görev Atanan Zorunlu alan"),
        status: Yup.object().required("Görev Durumu Zorunlu alan"),
        //status: Yup.number().typeError("Servis Versiyonu Alanı sadece sayı olmalıdır"),
    });
    const formik = useFormik({
        initialValues: {...task,
            dueDate: (typeof task.dueDate === 'string' ? new Date(task.dueDate) : task.dueDate),
            history: task.history ? task.history : [],
            comments: task.comments ? task.comments : []
        },
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
    })

    //validasyon hata mesajları
    const isFormFieldInvalid = (name: string) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: string) => {
        return isFormFieldInvalid(name) ? (
            <small className="p-error">{formik.errors[name]}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };

    const selectButtonValues1: { name: string, code: TaskPriority }[] = [
        {name: "Düşük", code: TaskPriority.Low},
        {name: "Orta", code: TaskPriority.Medium},
        {name: "Yüksek", code: TaskPriority.High},
    ];


    const taskDialogFooter = (
        <>
            <Button
                label="İptal"
                icon="pi pi-times"
                className="p-button-text"
                onClick={() => {
                    onHideDialog()
                }}
            />
            <Button
                label="Kaydet"
                icon="pi pi-check"
                className="p-button-text"
                type="submit"
                onClick={() => {
                    formik.handleSubmit();
                    if (Object.keys(formik.errors).length == 0) onHideDialog();
                }}
            />
        </>
    );

    const onHideDialog = () => {
        hideDialog();
    }

    return <Dialog
        id="taskDialog"
        key="taskDialog"
        footer={taskDialogFooter}
        visible={isVisible} style={{width: "75rem"}}
        onHide={onHideDialog}>
        <div className="grid">
            <div className="col-8">
                <div>
                    <label htmlFor="description">Açıklaması</label>
                    <InputTextarea
                        id="description"
                        value={formik.values?.description}
                        onChange={formik.handleChange}
                        required
                        className={classNames("w-full", {"p-invalid": isFormFieldInvalid("description")})}
                    />{getFormErrorMessage("description")}
                </div>
                <TabView>
                    <TabPanel header="Faaliyet Akışı">
                        <div className="space-y-4">
                            {formik.values.history.map((record, index) => (
                                <div key={index} className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                            <i className="pi pi-history"/>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div className="text-xs">
                                                <span className="font-medium text-gray-900">{record.by}</span>
                                            </div>
                                            <span className="text-[11px] text-gray-500">
                              {format(record.date, "dd.MM.yyyy HH:mm")}
                            </span>
                                        </div>
                                        {record.note && (
                                            <p className="mt-1.5 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                                                {record.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel header="Yorumlar">
                        <div className="space-y-6">
                            {formik.values.comments?.map((comment, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                              <span className="font-medium text-gray-900">
                                {comment.user}
                              </span>
                                                <span className="text-xs text-gray-500 ml-2">
                                {format(comment.date, 'dd.MM.yyyy HH:mm')}
                              </span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-gray-600">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                </TabView>

                {/* Comment Input*/}
                <div className="mt-6 pt-6 border-t">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                      <textarea
                          placeholder="Yorum ekle..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={3}
                      />
                            <div className="mt-2 flex justify-between items-center">
                                <Button
                                    onClick={() => {
                                        formik.setFieldValue("comments", [...formik.values.comments, new Comment("System", newComment)], false);
                                        setNewComment("");
                                    }
                                    }
                                    disabled={!newComment.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Gönder
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="field">
                    <label>Görev Önceliği</label>
                    <SelectButton id="priority"
                                  value={formik.values?.priority}
                                  onChange={(e) => {
                                      console.log(e.value);
                                      formik.setFieldValue('priority', e.target.value);
                                  }}
                                  options={selectButtonValues1}
                                  optionLabel="name"
                                  optionValue="code"
                    />
                    {getFormErrorMessage("priority")}
                </div>
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
                    <label>Teslim Tarihi</label>
                    <Calendar
                        id="dueDate" showTime
                        value={formik.values?.dueDate}
                        onChange={formik.handleChange}
                        required locale="tr"
                        className={classNames("w-full", {"p-invalid": isFormFieldInvalid("dueDate")})}
                    />{getFormErrorMessage("dueDate")}
                </div>
                <div className="field">
                    <label>İlerleme (%{formik.values.progress})</label>
                    <Slider id="progress" value={formik.values.progress}
                            onChange={(e) => formik.setFieldValue("progress", e.value, false)}/>
                </div>
                <div className="field">
                    <label>Atanan</label>
                    <Dropdown id="assignedTo" value={formik.values?.assignedTo} options={fetchPeople.data}
                              required
                              optionLabel="label"
                              className={classNames("w-full", {"p-invalid": isFormFieldInvalid("assignedTo")})}
                              filter onChange={formik.handleChange}/>
                    {getFormErrorMessage("assignedTo")}
                </div>
                <div className="field">
                    <label>Durumu</label>
                    <Dropdown id="status" value={formik.values?.status} options={fetchStatuses.data} required
                              optionLabel="label"
                              className={classNames("w-full", {"p-invalid": isFormFieldInvalid("status")})}
                              onChange={formik.handleChange}/>
                    {getFormErrorMessage("status")}
                </div>
            </div>
        </div>

    </Dialog>
}