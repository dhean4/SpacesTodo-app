import { Injectable } from '@angular/core';
import { Task } from "./task";
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    tasks: Task[] = [
        {
            taskId: 1,
            done: false,
            createdAt: '',
            deadline: '01/12/2023',
            title: 'first',
            description: '',
            priority: 'low',
            // deadline: Date;
            attachLink: {
                link: 'string',
                shortLink: 'string'
            },
            imageUrl: null
        },
        {
            taskId: 2,
            done: false,
            createdAt: '',
            deadline: '01/12/2023',
            title: 'second',
            description: '',
            priority: 'medium',
            // deadline: Date;
            attachLink: {
                link: 'string',
                shortLink: 'string'
            },
            imageUrl: null
        },
        {
            taskId: 3,
            done: true,
            createdAt: '',
            deadline: '01/12/2023',
            title: 'third',
            description: '',
            priority: 'high',
            // deadline: Date;
            attachLink: {
                link: 'string',
                shortLink: 'string'
            },
            imageUrl: null
        },
        {
            taskId: 4,
            done: true,
            createdAt: '',
            deadline: '01/12/2023',
            title: 'fourth',
            description: '',
            priority: 'low',
            // deadline: Date;
            attachLink: {
                link: 'string',
                shortLink: 'string'
            },
            imageUrl: null
        }
    ];

    constructor() { }

    getTasks(filter1: string, filter2: string): Observable<Task[]> {
        let filteredTasks: Task[];

        if (filter1 === 'all') {
            filteredTasks = this.tasks;
        }
        else {
            filteredTasks = this.tasks.filter((task) => filter1 === 'done' ? task.done : !task.done);
        }

        if (filter2 === 'high') {
            filteredTasks = filteredTasks.filter((task) => {
                filter2 === 'high'
                return task.priority == 'high'
            });
        }

        if (filter2 === 'medium') {
            filteredTasks = filteredTasks.filter((task) => {
                filter2 === 'medium'
                return task.priority == 'medium'
            });
        }

        if (filter2 === 'low') {
            filteredTasks = filteredTasks.filter((task) => {
                filter2 === 'low'
                return task.priority == 'low'
            });
        }
        return of(filteredTasks);

    }

    addTask(task: Task): void {
        task.taskId = this.tasks.length + 1;
        this.tasks.push(task)
    }

    getTask(taskId: number): Observable<Task> {
        const task = of(this.tasks.find(task => task.taskId == taskId));
        return task;
    }

    deleteTask(task: Task): void {
        const id = this.tasks.indexOf(task);

        if (id >= 0) {
            this.tasks.splice(id, 1);
        }
    }

    updateTask(taskId: number, task: Task): void {
        task.taskId = taskId;
        const id = this.tasks.findIndex(task => task.taskId == taskId)
        this.tasks.splice(id, 1, task);
    }


}
