import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyalertComponent } from './emptyalert.component';

describe('EmptyalertComponent', () => {
  let component: EmptyalertComponent;
  let fixture: ComponentFixture<EmptyalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyalertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
