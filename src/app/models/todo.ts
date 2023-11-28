export interface Task {
    taskId:number,
    isCompleted:boolean,
    createdAt: string,
    deadline: string,
    title: string | null;
    priority: string | null | undefined;
    description: string | null | undefined;

}