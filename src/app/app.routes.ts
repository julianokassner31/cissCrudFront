import { Routes } from '@angular/router';
import { RegisterEmployerComponent } from './register-employer/register-employer.component';
import { ErroComponent } from './erro/erro.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterEmployerComponent,
    pathMatch: 'full'
  },

  {
    path: 'about',
    component: AboutComponent,
  },

  {
    path: 'erro',
    component: ErroComponent,
  },

  {
    path: 'employer',
    loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule)
  }
];
