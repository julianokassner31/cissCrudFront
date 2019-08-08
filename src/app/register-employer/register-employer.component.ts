import { Employer } from './../model/Employer';
import { EmployerService } from './../services/employer.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-register-employer',
  templateUrl: './register-employer.component.html',
  styleUrls: ['./register-employer.component.css']
})
export class RegisterEmployerComponent implements OnInit {
  form: FormGroup;
  employers: Employer[] = [];
  msg = [];
  editing = false;
  deleting: string;

  constructor(
    private fb: FormBuilder,
    private employerService: EmployerService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.initForm();
    this.getEmployers();
  }

  getEmployers() {
    this.employerService.getEmployers().subscribe(resp => {
      this.employers = resp;
    });
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
    this.msg = [];
    this.employerService.create(this.form.value).subscribe(
      (emp: Employer) => {
      this.msg.push({ severity: 'info', summary: '', detail: 'Cadastro efetuado com sucesso'});
      this.employers.push(emp);
      this.resetForm();
    },
    error => {
      this.msg.push({ severity: 'danger', summary: '', detail: 'Ocorreu um erro ao criar o cadastro!'});
    });
  }

  resetForm() {
    this.editing = false;
    this.form.reset();
  }

  edit(employer: Employer ) {
    this.form.setValue(employer);
    this.editing = true;
  }

  update() {
    this.employerService.update(this.form.value).subscribe(
      (emp: Employer) => {
        this.msg.push({ severity: 'info', summary: '', detail: 'Cadastro alterado com sucesso'});
        this.employers = this.employers.filter(e => e.id !== this.form.controls['id'].value);
        this.employers.push(emp);
        this.resetForm();
      },
      error => {
        this.msg.push({ severity: 'danger', summary: '', detail: 'Ocorreu um erro ao editar cadastro!'});
      });
  }

  private delete(id: string): void {
    this.employerService.delete(id).subscribe(
      resp => {
        this.msg.push({ severity: 'danger', summary: '', detail: 'Cadastro excluído com sucesso'});
        this.employers = this.employers.filter(emp => emp.id !== id);
    },
    error => {
      this.msg.push({ severity: 'danger', summary: '', detail: 'Ocorreu um erro ao excluir cadastro!'});
    });
  }

  showDialogDelete(id: string) {
    this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir este funcionário?',
        accept: () => {
          this.delete(id);
        },
        reject: () => {
          return;
        },
        acceptLabel: 'Continuar',
        rejectLabel: 'Cancelar'
    });
  }
}
