import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

export const routes: Routes = [
    { path:'home', component: HomeComponent },
    {path:'todos', component: TodoListComponent},
    {path:'add-task', component: AddTodoComponent},
    {path:'todo/:id', component:TodoItemComponent},
    {path:'edit-todo/:id', component: AddTodoComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  ];
