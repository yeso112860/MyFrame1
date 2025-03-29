import {useMutation, useQuery,} from "@tanstack/react-query";
import {useToast} from "~/store/toastContext.tsx";
import {useState} from "react";
import * as service from "~/service/historyServices.ts";

export function useHistoryHook(fetchEnabled: boolean = true) {
    const showToast = useToast();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(-1);
    const [filters, setFilters] = useState();
    const [sortList, setSortList] = useState();
    const [stringSearchKey, setStringSearchKey] = useState(null);

    const getHistoryById = useMutation({
        mutationFn: ({id, path}: { id: string; path: string }) =>
            service.getHistory(id, "/api/changeit/history"),
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            showToast("error", "Hata", error.message);
        },
    });

    return {
        page,
        setPage,
        size,
        setSize,
        filters,
        setFilters,
        sortList,
        setSortList,
        stringSearchKey,
        setStringSearchKey,
        getHistoryById,
    };
}

/**
 * Typings for the useUserHook function.
 */
export interface iHistoryHook {
    fetchHistory: ReturnType<typeof useQuery>;
    newHistory: ReturnType<typeof useMutation>;
    editHistory: ReturnType<typeof useMutation>;
    getHistoryById: ReturnType<typeof useMutation>;
    deleteHistory: ReturnType<typeof useMutation>;
}

/**
 * Represents an initial user object with basic information.
 *
 */
