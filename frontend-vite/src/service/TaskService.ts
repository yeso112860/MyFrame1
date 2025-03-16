import {Parameter, Task} from "~/utilities/types/models.ts";
import {apiBaseURL} from "~/utilities/constants";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

class TaskService {
    getTasks = async (): Promise<Task[]> => {
        const response = await axios.get(`${apiBaseURL}/api/changeit`);
        return response.data;
    };
    getDurumlar = (): Parameter[] => {
        const fetchDurumlar = (): Promise<Parameter[]> =>
            axios.get(`${apiBaseURL}/api/changeit/durumlar`).then((response) => response.data);

        const { data } = useQuery({ queryKey: ['People'], queryFn: fetchDurumlar })
        // if (!this.durumlar)
        //     axios.get(`${apiBaseURL}/api/changeit/durumlar`).then((response) => this.durumlar = response.data);
        return data;
    }
    getPeople = (): Parameter[] => {
        const fetchPeople = (): Promise<Parameter[]> =>
            axios.get(`${apiBaseURL}/api/changeit/people`).then((response) => response.data);

        const { data } = useQuery({ queryKey: ['Durumlar'], queryFn: fetchPeople })
        // if (!this.people)
        //     axios.get(`${apiBaseURL}/api/changeit/people`).then((response) => this.people = response.data);
        return data;
    }

    saveTask(_task: Task) {
        if (_task)
            axios.post(`${apiBaseURL}/api/changeit`,_task);
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
