import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutoRequestComponent } from './input-auto-request.component';

describe('InputAutoRequestComponent', () => {
  let component: InputAutoRequestComponent;
  let fixture: ComponentFixture<InputAutoRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputAutoRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAutoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
