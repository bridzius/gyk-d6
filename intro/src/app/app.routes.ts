import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskpageComponent } from './taskpage/taskpage.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  { path: 'tasks/:id', component: TaskpageComponent },
];
