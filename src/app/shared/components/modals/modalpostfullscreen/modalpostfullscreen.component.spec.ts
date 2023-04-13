import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpostfullscreenComponent } from './modalpostfullscreen.component';

describe('ModalpostfullscreenComponent', () => {
  let component: ModalpostfullscreenComponent;
  let fixture: ComponentFixture<ModalpostfullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalpostfullscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalpostfullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
