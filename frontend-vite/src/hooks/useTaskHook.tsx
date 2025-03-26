import {useAuthHook} from "~/hooks/useAuthHook.tsx";
import {useEffect, useState} from "react";
import {keepPreviousData, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {taskApi} from "~/service/TaskService.ts";
import Task from "~/utilities/types/models";
import {useToast} from "~/store/toastContext.tsx";

export function useTaskHook() {
    const queryClient = useQueryClient();
    const { isAuthenticated, user } = useAuthHook();
    const [fetch, setFetch] = useState(false);
    const showToast = useToast();

    const fetchTasks = useQuery({
        enabled: fetch,
        queryKey: ["Tasks"],
        queryFn: async () => taskApi.getTasks(),
        placeholderData: keepPreviousData,
        staleTime: 30000,
    });
    const newTask = useMutation({
        mutationFn: (data: Task) => taskApi.newTask(data),
        onSuccess: (data) => {
            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["Tasks"] });
                showToast(
                    "success",
                    "Başarılı",
                    "Yeni Görev oluşturma işlemi başarıyla tamamlandı",
                );
            } else {
                showToast("error", "Hata", data?.mesaj);
            }
        },
        onError: (error) => {
            showToast("error", "Hata", error.message);
        },
    });
    const deleteTask = useMutation({
        mutationFn: (data: Task) => taskApi.deleteTask(data),
        onSuccess: (data) => {
            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["Tasks"] });
                showToast(
                    "success",
                    "Başarılı",
                    "Görev silme işlemi başarıyla tamamlandı",
                );
            } else {
                showToast("error", "Hata", data?.mesaj);
            }
        },
        onError: (error) => {
            showToast("error", "Hata", error.message);
        },
    });

    const fetchPeople = useQuery({
        enabled: fetch,
        queryKey: ["People"],
        queryFn: async () => taskApi.getPeople(),
        placeholderData: keepPreviousData,
        staleTime: 300000,
    });

    useEffect(() => {
        if (isAuthenticated && user ) {
            setFetch(true);
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        if (fetch) {
            fetchTasks.refetch();
        }
    }, [fetch]);
    return {
        fetchTasks,
        newTask,
        deleteTask,
        fetchPeople,
    };
}