export interface ITask {
    id?: string;
    title?: string;
    description?: string;
    reportedBy?: IParameter;
    assignedBy?: IParameter;
    assignedTo?: IParameter;
    status?: IParameter;
}

export interface IParameter {
    id?: string;
    label?: string;
}
