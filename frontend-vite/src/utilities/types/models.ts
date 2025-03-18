export class Task {
    id?: string;
    title?: string;
    description?: string;
    deadline?: Date;
    reportedBy?: Parameter;
    assignedBy?: Parameter;
    assignedTo?: Parameter;
    durum?: Parameter;

    constructor(id?: string, title?: string, description?: string, deadline?: Date, assignedBy?: Parameter, assignedTo?: Parameter, durum?: Parameter) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.assignedBy = assignedBy;
        this.assignedTo = assignedTo;
        this.durum = durum;
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
