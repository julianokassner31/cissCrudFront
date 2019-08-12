import { query } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-auto-request',
  templateUrl: './input-auto-request.component.html',
  styleUrls: ['./input-auto-request.component.css']
})
export class InputAutoRequestComponent implements OnInit {
  @Input() placeholder: string;
  @Input() tooltip: string;
  @Output() emitter = new EventEmitter();
  timer: any;

  constructor() { }

  ngOnInit() {
  }

  dispatcher(event) {
    const value = event.srcElement.value.trim();
    if (value === '' || value.length >= 2) {
      clearTimeout(this.timer);
      const fn = () => {
        this.emitter.emit(value);
      };
      this.timer = setTimeout(fn, 300);
    }
  }
}
