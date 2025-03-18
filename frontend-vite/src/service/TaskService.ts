import {Parameter, Task} from "~/utilities/types/models.ts";
import {apiBaseURL} from "~/utilities/constants";
import axios from "axios";
import fileDownload from 'js-file-download'

class TaskService {
    getTasks = async (): Promise<Task[]> => {
        const response = await axios.get(`${apiBaseURL}/api/changeit`);
        return response.data;
    };
    getDurumlar = async (): Promise<Parameter[]> => {
        const response = await axios.get(`${apiBaseURL}/api/changeit/durumlar`);
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
            const response = await axios.delete(`${apiBaseURL}/api/changeit/${_task.id}`, _task);
            return response.data;
        } else return {}
    }
    exportTasks = async () => {
         axios.get(`${apiBaseURL}/api/changeit/export`).then(response => fileDownload(response.data,'file.xlsx'));
    }
}

export const taskApi = new TaskService();

export const emptyTask: Task = {
    id: undefined,
    title: undefined,
    description: undefined,
    reportedBy: undefined,
    assignedBy: undefined,
    assignedTo: undefined,
    durum: undefined
};
