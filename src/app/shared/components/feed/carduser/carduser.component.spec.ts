import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarduserComponent } from './carduser.component';

describe('CarduserComponent', () => {
  let component: CarduserComponent;
  let fixture: ComponentFixture<CarduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarduserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
