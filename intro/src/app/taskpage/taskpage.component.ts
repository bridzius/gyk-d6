import { Component, inject, Signal } from '@angular/core';
import { Task } from '../types';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { TasksService } from '../tasks.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-taskpage',
  imports: [UpperCasePipe, DatePipe],
  template: `
    @if (task(); as t) {
    <p>{{ t.id }}</p>
    <p>{{ t.text | uppercase }}</p>
    <p>{{ t.date | date }}</p>
    }
  `,
})
export class TaskpageComponent {
  private service = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  id: string = this.activatedRoute.snapshot.params['id'];
  task: Signal<Task | undefined> = toSignal(this.service.getTaskById(this.id));

  constructor() {}
}
