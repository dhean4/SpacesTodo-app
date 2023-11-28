import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TodoService } from '../../service/todo.service';
import { Task } from '../../models/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  tasks: Task[] = [];
  filter: 'all' | 'to do' | 'done' = 'all';
  priority: 'high' | 'medium' | 'low' | undefined | any;

  showSideBar: boolean = false;

  constructor(private taskService: TodoService, private router: Router) { }

  ngOnInit(): void {
      this.getTasks();
  }

  getTasks(): void {
      this.taskService.getTasks(this.filter, this.priority).subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(task: Task): void {
      this.taskService.deleteTask(task);
  }

  handleChange(evt:any) {
      var target = evt.target;
      if (target.checked) {
          this.filter = evt.target.value
          this.getTasks();
      }
  }

  handlePriority(evt:any) {
      var target = evt.target;
      if (target.checked) {
          this.priority = evt.target.value
          this.getTasks();
      }
      console.log("here");

  }

  displaySideBar():void{
    this.showSideBar=!this.showSideBar;
  }

  changeStatus(task:any) {
      task.isCompleted = !task.isCompleted;
      this.taskService.updateTask(task.taskId, task)
  }

}
