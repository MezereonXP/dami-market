import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamgoodComponent } from './teamgood.component';

describe('TeamgoodComponent', () => {
  let component: TeamgoodComponent;
  let fixture: ComponentFixture<TeamgoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamgoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamgoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
