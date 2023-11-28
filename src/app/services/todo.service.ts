// todo.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  fav = [];
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Todo One',
      isCompleted: false,
      date: new Date('4-15-203')
    },
    {
      id: 2,
      title: 'Todo Two',
      isCompleted: false,
      date: new Date('11-27-2023')
    },
    {
      id: 3,
      title: 'Todo Three',
      isCompleted: false,
      date: new Date('01-28-2023')
    }
  ];

  // private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);

  constructor() { }
  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.todosSubject.next(this.todos);
  }

  deleteTodo(todoId: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    this.todosSubject.next(this.todos);
  }
}
