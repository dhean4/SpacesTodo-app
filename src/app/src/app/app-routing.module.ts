import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskPageComponent } from "./task-page/task-page.component";
import { AllTasksComponent } from "./all-tasks/all-tasks.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";


const routes: Routes = [
  {path:'homepage', component:AllTasksComponent},
  {path:'new-task', component:TaskPageComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'task/:id', component: TaskDetailsComponent },
  {path:'edit-task/:id', component:TaskPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
