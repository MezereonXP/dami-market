import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Regist2Component } from './regist2.component';

describe('Regist2Component', () => {
  let component: Regist2Component;
  let fixture: ComponentFixture<Regist2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Regist2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Regist2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
