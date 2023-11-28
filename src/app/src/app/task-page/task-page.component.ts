import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Task } from "../task";
import { TaskService } from "../task.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';

@Component({
    selector: 'app-task-page',
    templateUrl: './task-page.component.html',
    styleUrls: ['./task-page.component.css'],
})
export class TaskPageComponent implements OnInit {
    taskForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        priority: new FormControl(''),
        deadline:new FormControl(''),
        image: new FormControl(''),
        link: new FormControl(''),
        shortLink: new FormControl('')
    });

    tasks: Task[] = [];
    taskId: number = 1;
    imageUrl: string = '';
    task?:Task ;
    id:number = Number(this.route.snapshot.params['id']);
    isAddMode: boolean;

    constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.taskService.getTask(this.id)
                .pipe(first())
                .subscribe(x => this.taskForm.patchValue(x));
        }
     }

    // On file Select
    onChange(event) {
        let file = event.target.files[0];

        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.imageUrl = reader.result as string;
        }
        reader.readAsDataURL(file);
        console.log(this.imageUrl);
    }

    onClickSave() {
        let task: Task = {
            taskId: 1,
            createdAt: new Date().toDateString(),
            deadline: this.taskForm.value.deadline,
            done: false,
            title: this.taskForm.getRawValue().title,
            description: this.taskForm.value.description,
            priority: this.taskForm.value.priority,
            // deadline: this.taskForm.value.deadline,
            imageUrl: this.imageUrl,
            attachLink: {
                link: this.taskForm.value.link,
                shortLink: this.taskForm.value.shortLink,
            }
        };

        if (this.isAddMode) {
            this.createTask(task);
        } else {
            this.updateTask(task);
            console.log('task updated!');
            
        }
        this.router.navigate(['/homepage'])
    }

    createTask(task: Task) {
        this.taskService.addTask(task);
    }

    updateTask(task: Task) {
        this.route.params
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.taskService.updateTask(id, task)
        }
      });
    }

    getTask(): void {
            this.taskService.getTask(this.id)
              .subscribe(task => this.task = task);
          }
}
