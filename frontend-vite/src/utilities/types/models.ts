export enum TaskPriority {
    Low = 'LOW', Medium = 'MEDIUM', High = 'HIGH',
}

export class Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: TaskPriority;
    progress: number;
    assignedBy?: Parameter;
    assignedTo?: Parameter;
    status?: Parameter;
    history: TaskHistory[];
    comments: Comment[];

    constructor(id?: string, title?: string, description?: string, dueDate?: Date, priority?: TaskPriority,
                progress?: number, assignedBy?: Parameter, assignedTo?: Parameter, status?: Parameter) {
        this.id = id || '';
        this.title = title || '';
        this.description = description || '';
        this.dueDate = dueDate || new Date();
        this.priority = priority || TaskPriority.Low;
        this.progress = progress || 0;
        this.assignedBy = assignedBy;
        this.assignedTo = assignedTo;
        this.status = status;
        this.history = [];
        this.comments = [];
    }
}

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
