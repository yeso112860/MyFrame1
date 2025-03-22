import { Task } from "../types";
import { sortEntriesWithOrder } from "./EntryWithOrder";
import { makeRecord } from "./makeRecord";
import { TaskStatus, taskStatuses } from "./tastStatus";
import { toEntries } from "./toEntries";

export const groupItems = <T, K extends string | number>(
    items: T[],
    getKey: (item: T) => K
  ): Record<K, T[]> => {
    const result = {} as Record<K, T[]>
  
    items.forEach((item) => {
      const key = getKey(item)
      if (!result[key]) {
        result[key] = []
      }
      result[key]?.push(item)
    })
  
    return result
  }

export const groupTasks = (items:Task[]) => toEntries<TaskStatus,Task[]>({
    ...makeRecord(taskStatuses, () => []),
    ...recordMap(groupItems<Task,TaskStatus>(Object.values(items),(task)=>task.durum)),sortEntriesWithOrder
})