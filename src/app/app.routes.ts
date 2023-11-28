import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path:'todo', component: TodoListComponent},
    {path:'new-task', component: AddTodoComponent},
  ];
