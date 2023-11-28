import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../service/todo.service';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { take } from 'rxjs';
import { Task } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {

  task:Task | any ;

  constructor(private taskService:TodoService, private route: ActivatedRoute,
    private router: Router ) { }

    ngOnInit(): void {
        this.getTask();
      }

  getTask(): void {
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
