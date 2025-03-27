import {Parameter, Task} from "~/utilities/types/models.ts";
import {apiBaseURL} from "~/utilities/constants";
import axios from "axios";
import {ExportTable} from "~/utilities/utils.ts";

class TaskService {
    getTasks = async (): Promise<Task[]> => {
        const response = await axios.get(`${apiBaseURL}/api/changeit`);
        return response.data;
    };
    getStatuses = async (): Promise<Parameter[]> => {
        const response = await axios.get(`${apiBaseURL}/api/changeit/statuses`);
        return response.data;
    }
    getPeople = async (): Promise<Parameter[]> => {
        const response = await axios.get(`${apiBaseURL}/api/changeit/people`);
        return response.data;
    }
    newTask = async (_task: Task) => {
        if (_task) {
            const response = await axios.post(`${apiBaseURL}/api/changeit`, _task);
            return response.data;
        } else return {}
    }
    deleteTask = async (_task: Task) => {
        if (_task && _task.id) {
            const response = await axios.delete(`${apiBaseURL}/api/changeit/${_task.id}`);
            return response.data;
        } else return {}
    }
    exportTasks = async ({ exportType, fields }) => {
        const response = await axios.post(`${apiBaseURL}/api/changeit/export`,{
            // selectedId,
            // sortList,
            // filters,
            exportType: exportType,
            fieldNames:fields,
            // stringSearchKey,
        },{
             responseType: "arraybuffer",
         });
        ExportTable(
            response.data,
            `Görevler.${exportType === "excel" ? "xlsx" : exportType === "word" ? "docx" : exportType}`,
            "application/octet-stream",
        );
    }
}

export const taskApi = new TaskService();
