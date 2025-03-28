import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from '../types';
import { TasksService } from '../tasks.service';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TaskWithMessage } from './task.model';
import { TaskformComponent } from '../taskform/taskform.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, RouterLink, FormsModule, TaskformComponent],
  template: `
    <h1>Mano šiandienos užduotys:</h1>
    <app-taskform></app-taskform>
    <ul>
      @for (taskas of taskai(); track $index) {
      <li>
        <a routerLink="/tasks/{{ taskas.id }}"
          ><app-task [task]="taskas"></app-task
        ></a>
      </li>
      }
    </ul>
  `,
})
export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService);
  private destroyRef = inject(DestroyRef);
  taskai: Signal<Task[]> = this.tasksService.tasksSignal;

  ngOnInit(): void {
    this.tasksService
      .getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
