import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopcarComponent } from './shopcar.component';

describe('ShopcarComponent', () => {
  let component: ShopcarComponent;
  let fixture: ComponentFixture<ShopcarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopcarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
