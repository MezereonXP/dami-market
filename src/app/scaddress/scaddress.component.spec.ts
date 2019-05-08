import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaddressComponent } from './scaddress.component';

describe('ScaddressComponent', () => {
  let component: ScaddressComponent;
  let fixture: ComponentFixture<ScaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
