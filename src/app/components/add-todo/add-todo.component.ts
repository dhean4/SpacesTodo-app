import { Component } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/todo';
import { TodoService } from '../../service/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
    selector: 'app-add-todo',
    standalone: true,
    templateUrl: './add-todo.component.html',
    styleUrl: './add-todo.component.scss',
    imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class AddTodoComponent {
  taskForm:any = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(1)]),
    description: new FormControl(''),
    priority: new FormControl(''),
    deadline:new FormControl('')
});

tasks: Task[] = [];
taskId: number = 1;
task?:Task ;
id:number = Number(this.route.snapshot.params['id']);
isAddMode: boolean=false;

constructor(private taskService: TodoService, private router: Router, private route: ActivatedRoute, private location:Location) { }

ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
        this.taskService.getTask(this.id)
            .pipe(first())
            .subscribe(data => this.taskForm.patchValue(data));
    }
 }

 back() {
  return this.location.back();
}


 onSubmit() {
    let task: Task = {
        taskId: 1,
        createdAt: new Date().toDateString(),
        deadline: this.taskForm.value.deadline,
        isCompleted: false,
        title: this.taskForm.getRawValue().title,
        description: this.taskForm.value.description,
        priority: this.taskForm.value.priority,
    };

    if (this.isAddMode) {
        this.createTask(task);
    } else {
        this.updateTask(task);
        console.log('task updated!');
        
    }
    this.router.navigate(['/todos'])
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

  get title() {
    return this.taskForm.get('tittle')!;
  }

}
