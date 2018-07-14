import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfcenterComponent } from './selfcenter.component';

describe('SelfcenterComponent', () => {
  let component: SelfcenterComponent;
  let fixture: ComponentFixture<SelfcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
