import { routes } from './employer.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerComponent } from './employer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    EmployerComponent
  ]
})
export class EmployerModule { }
