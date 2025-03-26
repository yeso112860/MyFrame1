export enum TaskPriority {
    Low = 'LOW', Medium = 'MEDIUM', High = 'HIGH',
}
export enum TaskStatus {
    OPEN='OPEN', IN_PROGRESS='IN_PROGRESS', WAITING='WAITING', COMPLETED='COMPLETED'
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
    status?: TaskStatus;
    private _history: TaskHistory[] = [];
    private _comments: Comment[] = [];
    public get history() {return this._history;}
    public set history(history: TaskHistory[]) {this._history = history;}
    public get comments() {return this._comments;}
    public set comments(comments: Comment[]) {this._comments = comments;}

    constructor(id?: string, title?: string, description?: string, dueDate?: Date, priority?: TaskPriority,
                progress?: number, assignedBy?: Parameter, assignedTo?: Parameter, status?: TaskStatus) {
        this.id = id || '';
        this.title = title || '';
        this.description = description || '';
        this.dueDate = dueDate || new Date();
        this.priority = priority || TaskPriority.Low;
        this.progress = progress || 0;
        this.assignedBy = assignedBy;
        this.assignedTo = assignedTo;
        this.status = status;
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

    constructor(user?: string, content?: string) {
        this.user = user;
        this.content = content;
    }
}

export class Parameter {
    id?: string;
    label?: string;

    constructor(id?: string, label?: string) {
        this.id = id;
        this.label = label;
    }
}
