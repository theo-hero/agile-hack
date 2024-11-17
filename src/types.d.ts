export interface TaskTypes {
    entity_id: number;
    area: string;
    type: string;
    status: string;
    state: string;
    priority: string;
    ticket_number: string;
    name: string;
    create_date: string;
    created_by: string;
    update_date: string;
    updated_by: string;
    parent_ticket_id: number | null;
    assignee: string;
    owner: string;
    due_date: string | null;
    rank: string;
    estimation: number | null;
    spent: string | null;
    resolution: string | null;
}

export interface SprintTypes {
    sprint_id: number;
    sprint_name: string;
    sprint_status: string;
    sprint_start_date: string;
    sprint_end_date: string;
    entity_ids: number[];
}
