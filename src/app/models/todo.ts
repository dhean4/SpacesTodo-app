export interface Task {
    taskId:number,
    isCompleted:boolean,
    createdAt: string,
    deadline: string | any,
    title: string | null;
    priority: string | null | undefined;
    description: any | null | undefined;

}