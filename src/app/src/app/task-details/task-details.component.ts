import { Component, OnInit } from '@angular/core';
import { TaskService } from "../task.service";
import { Task } from "../task";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

    task:Task ;

  constructor(private taskService:TaskService, private route: ActivatedRoute,
    private router: Router ) { }

    ngOnInit(): void {
        this.getTask();
      }

  getTask(): void {
// const id = Number(this.route.snapshot.params['id']);
    // this.taskService.getTask(id)
    //   .subscribe(task => this.task = task);

      this.route.params
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.taskService.getTask(id).pipe(
            take(1)).subscribe(task => this.task = task);
        }
      });
  }

}
