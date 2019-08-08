import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ErroComponent } from './erro/erro.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterEmployerComponent } from './register-employer/register-employer.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterEmployerComponent,
    MenuComponent,
    ErroComponent,
    AboutComponent,
    InputFieldComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    InputMaskModule,
    MessagesModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
