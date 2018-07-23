import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KilltipsComponent } from './killtips.component';

describe('KilltipsComponent', () => {
  let component: KilltipsComponent;
  let fixture: ComponentFixture<KilltipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KilltipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KilltipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
