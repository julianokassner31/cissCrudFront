import { FormControlName, Form } from '@angular/forms';
import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit, AfterContentInit {

  @Input() label: string;
  @ContentChild(FormControlName,  {static: false}) formControl: FormControlName;
  input: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    if ( this.formControl !== undefined ) {
      this.input = this.formControl;
    }
  }

}
