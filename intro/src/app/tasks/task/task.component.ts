import { Component, input, Input } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  LowerCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Task } from '../../types';

@Component({
  selector: 'app-task',
  imports: [UpperCasePipe, DatePipe],
  template: `
    <p>{{ task().text | uppercase }}</p>
    <p>{{ task().date | date }}</p>
  `,
})
export class TaskComponent {
  task = input.required<Task>();
}
