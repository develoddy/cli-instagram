import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaloptionpostComponent } from './modaloptionpost.component';

describe('ModaloptionpostComponent', () => {
  let component: ModaloptionpostComponent;
  let fixture: ComponentFixture<ModaloptionpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaloptionpostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaloptionpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
