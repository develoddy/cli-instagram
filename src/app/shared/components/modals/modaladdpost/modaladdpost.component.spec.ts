import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdpostComponent } from './modaladdpost.component';

describe('ModaladdpostComponent', () => {
  let component: ModaladdpostComponent;
  let fixture: ComponentFixture<ModaladdpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdpostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
