import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from '../types';
import { TasksService } from '../tasks.service';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TaskWithMessage } from './task.model';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, RouterLink, FormsModule],
  template: `
    <h1>Mano šiandienos užduotys:</h1>
    <form #taskForm="ngForm" (ngSubmit)="pridek()">
      <fieldset>
        <ul>
          <li>
            <label for="text">Tekstas</label>
            <input
              type="text"
              name="text"
              id="text"
              [(ngModel)]="model.text"
              required
              #taskText="ngModel"
            />
          </li>
          @if (taskText.errors?.['required']) {
          <span>Laukas privalomas</span>
          }
          <li>
            <label for="date">Data</label>
            <input
              type="date"
              name="date"
              id="date"
              [(ngModel)]="model.stringDate"
              required
              min="2025-03-28"
            />
          </li>
        </ul>
      </fieldset>
      <button [disabled]="!taskForm.valid">Pridek naują task</button>
    </form>
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
  model = new TaskWithMessage('', '');

  ngOnInit(): void {
    this.tasksService
      .getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  pridek() {
    this.tasksService
      .addTask({
        text: this.model.text,
        date: new Date(this.model.stringDate),
      })
      .pipe(take(1))
      .subscribe();
  }
}
