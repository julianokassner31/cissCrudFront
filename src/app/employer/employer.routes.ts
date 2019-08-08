import { Routes } from '@angular/router';
import { EmployerComponent } from './employer.component';
export const routes: Routes = [
  {
    path: ':id',
    component: EmployerComponent
  }
];

