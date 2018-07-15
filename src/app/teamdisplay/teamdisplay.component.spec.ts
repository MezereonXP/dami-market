import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamdisplayComponent } from './teamdisplay.component';

describe('TeamdisplayComponent', () => {
  let component: TeamdisplayComponent;
  let fixture: ComponentFixture<TeamdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
