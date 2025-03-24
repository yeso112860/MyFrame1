export const taskStatuses = ["backlog", "todo", "inProgress", "done"] as const
export type TaskStatus = (typeof taskStatuses)[number]