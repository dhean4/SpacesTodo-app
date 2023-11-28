import { Injectable } from '@angular/core';
import { Task } from '../models/todo'
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasks: Task[] = [
    {
      taskId: 1,
      isCompleted:false,
      createdAt: '',
      deadline:'20/11/2023',
      title: 'Preparing Docs',
      priority: 'low',
      description:'this is the first task',
    },
    {
      taskId: 2,
      isCompleted:false,
      createdAt: '',
      deadline: '26/11/2023',
      title: 'Studying DSA',
      priority: 'medium',
      description:'this is the second task',
    },
    {
      taskId: 3,
      isCompleted:false,
      createdAt: '',
      deadline: '15/11/2023',
      title: 'Building',
      priority: 'high',
      description:'this is the third task',
    },
  ]
  constructor() { }

  getTasks(filter1: string, filter2: string): Observable<Task[]> {
    let filteredTasks: Task[];

    if (filter1 === 'all') {
        filteredTasks = this.tasks;
    }
    else {
        filteredTasks = this.tasks.filter((task) => filter1 === 'done' ? task.isCompleted : !task.isCompleted);
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

getTask(taskId: number): Observable<Task | undefined> {
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
