import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';

import { Util } from '../util/util';
import { Employer } from './../model/Employer';
import { EmployerService } from './../services/employer.service';

@Component({
  selector: 'app-register-employer',
  templateUrl: './register-employer.component.html',
  styleUrls: ['./register-employer.component.scss']
})
export class RegisterEmployerComponent implements OnInit {
  form: FormGroup;
  employers: Employer[];
  editing = false;
  deleting: string;
  countEmployers = 0;

 @ViewChild('inputFind', {static: false}) inputFind: Element;

  constructor(
    private fb: FormBuilder,
    private employerService: EmployerService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.initForm();
    this.getEmployers();
  }

  getEmployers() {
    this.employerService.getEmployers().subscribe(resp => {
      this.mapResponse(resp);
    });
  }

  getEmployersPageable(event) {
    const page = event.first / event.rows;
    this.employerService.getEmployersPageable(page, event.rows).subscribe(resp => {
      this.mapResponse(resp);
    });
  }

  find(query) {
    this.employerService.findEmployers(query).subscribe(resp => this.employers = resp);
  }

  verifyEmailAlreadyRegistered(event) {
    const regex = new RegExp(Util.regexEmail);
    const email = event.srcElement.value;
    if (regex.test(email)) {
      this.employerService.emailAlreadyRegistered(email)
      .subscribe(resp => {
        if (resp) {
          this.form.controls['email'].setErrors({'emailAlreadyRegistered': true});
        } else {
          this.form.controls['email'].setErrors(null);
        }
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      id:        [],
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      lastname:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email:     ['', [Validators.required, Validators.email]],
      pis:       ['', [Validators.required, Validators.minLength(11),
                       Validators.maxLength(11), Validators.pattern(/\d/)]]
    });
  }

  create() {
    this.employerService.create(this.form.value).subscribe(
      (resp) => {
        this.setMessage('success', 'Cadastro efetuado com sucesso');
        this.mapResponse(resp);
    },
    error => {
      this.setMessage('error', 'Ocorreu um erro ao criar o cadastro!');
    });
  }

  mapResponse(resp: any) {
    this.employers = resp.employers;
    this.countEmployers = resp.count;
    this.resetForm();
  }

  resetForm() {
    this.editing = false;
    this.deleting = undefined;
    this.form.reset();
  }

  edit(employer: Employer ) {
    this.form.setValue(employer);
    this.editing = true;
  }

  update() {
    this.employerService.update(this.form.value).subscribe(
      (emp: Employer) => {
        this.setMessage('success', 'Cadastro alterado com sucesso');
        this.employers = this.employers.filter(e => e.id !== this.form.controls['id'].value);
        this.employers.push(emp);
        this.employers = _.orderBy(this.employers, ['firstname', 'asc']);
        this.resetForm();
      },
      error => {
        this.setMessage('error', 'Ocorreu um erro ao editar cadastro!');
      });
  }

  private delete(id: string): void {
    this.employerService.delete(id).subscribe(
      resp => {
        this.setMessage('success', 'Cadastro excluído com sucesso');
        this.mapResponse(resp);
    },
    error => {
      this.setMessage('error', 'Ocorreu um erro ao excluir cadastro!');
    });
  }

  private setMessage(severity: string, details: string) {
    this.messageService.add({ severity: severity, summary: '', detail: details});
  }

  onConfirm() {
    this.delete(this.deleting);
    this.messageService.clear('deleteFunc');
  }

  onReject() {
    this.messageService.clear('deleteFunc');
  }

  clear() {
    this.messageService.clear('deleteFunc');
  }

  showConfirm(id) {
    this.deleting = id;
    this.messageService.clear();
    this.messageService.add({key: 'deleteFunc', sticky: true, severity: 'warn', summary: 'Deseja continuar?', detail: 'Então confirme!'});
  }

}
