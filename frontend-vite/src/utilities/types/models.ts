export enum TaskPriority {
    Low = 'LOW', Medium = 'MEDIUM', High = 'HIGH',
}

export class Task {
    id?: string;
    title?: string;
    description?: string;
    dueDate?: Date;
    priority?: TaskPriority;
    progress?: number;
    assignedBy?: Parameter;
    assignedTo?: Parameter;
    status?: Parameter;
    history?: TaskHistory[];
    comments?: Comment[];

    constructor(id?: string, title?: string, description?: string, dueDate?: Date, priority?: TaskPriority,
                progress?: number, assignedBy?: Parameter, assignedTo?: Parameter, status?: Parameter) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.progress = progress;
        this.assignedBy = assignedBy;
        this.assignedTo = assignedTo;
        this.status = status;
    }
}

/*
export interface Task2 {
    id: number;
    title: string;
    creator: Person;
    assignee: Person;
    status: TaskStatus;
    type: TaskType;
    progress: number;
    startDate: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    description?: string;
    history: TaskHistory[];
    comments?: Comment[];
    canDelete?: boolean;
  }
*/
export class TaskHistory {
    date: Date = new Date();
    from?: string;
    to?: string;
    by?: string;
    note?: string;
}

export class Comment {
    date: Date = new Date();
    user?: string;
    content?: string;
}

export class Parameter {
    id?: string;
    label?: string;

    constructor(id?: string, label?: string) {
        this.id = id;
        this.label = label;
    }
}
