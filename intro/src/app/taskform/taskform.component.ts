import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TaskWithMessage } from '../tasks/task.model';
import { map, startWith, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { cenzurosValidator } from './cenzuros.validator';

@Component({
  selector: 'app-taskform',
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe],
  styles: '',
  template: `
    <form [formGroup]="taskForm" (submit)="pridek()">
      <fieldset>
        <ul>
          <li>
            <div>{{ remainingSymbolsMessage$ | async }}</div>
            <label for="text">Tekstas</label>
            <input
              [maxlength]="maxSymbols"
              type="text"
              name="text"
              id="text"
              formControlName="text"
            />
          </li>
          @if (textControl.errors?.['required']) {
          <span>Laukas privalomas</span>
          } @else if (textControl.errors?.['cenzuruotas']) {
          <span>
            Nepageidaujama necenzūrinė leksika: "{{ textControl.errors?.['cenzuruotas'].value

            }}"
          </span>
          }
          <li>
            <label for="date">Data</label>
            <input
              type="date"
              name="date"
              id="date"
              formControlName="date"
              min="2025-03-28"
            />
          </li>
          @if (dateControl.errors?.['required']) {
          <span>Laukas privalomas</span>
          }
        </ul>
      </fieldset>
      <button [disabled]="!taskForm.valid">Pridek naują task</button>
      <button type="reset">BAIK JUOKAUT</button>
    </form>
  `,
})
export class TaskformComponent {
  private tasksService = inject(TasksService);
  maxSymbols = 100;
  taskForm = new FormGroup({
    text: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(this.maxSymbols),
        cenzurosValidator,
      ],
      nonNullable: true,
    }),
    date: new FormControl('2025-03-28', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  remainingSymbolsMessage$ = this.textControl.valueChanges.pipe(
    startWith(''),
    map((val) => val.length),
    map((val) => `Liko simbolių: ${this.maxSymbols - val}/${this.maxSymbols}`)
  );

  constructor() {}

  get textControl() {
    return this.taskForm.controls['text'];
  }

  get dateControl() {
    return this.taskForm.controls['date'];
  }

  pridek() {
    this.tasksService
      .addTask({
        text: this.taskForm.getRawValue().text,
        date: new Date(this.taskForm.getRawValue().date),
      })
      .pipe(take(1))
      .subscribe();
  }
}
