import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from '../types';
import { TasksService } from '../tasks.service';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { lastValueFrom, Observable, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, RouterLink],
  template: `
    <h1>Mano šiandienos užduotys:</h1>
    <button (click)="pridek()">Pridek naują task</button>
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

  pridek() {
    this.tasksService
      .addTask({
        text: 'Naujas taskas',
        date: new Date(),
      })
      .pipe(take(1))
      .subscribe();
  }
}
