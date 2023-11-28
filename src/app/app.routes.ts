import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'todo', component: TodoListComponent },
];
