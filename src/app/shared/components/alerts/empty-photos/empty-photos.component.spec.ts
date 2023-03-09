import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPhotosComponent } from './empty-photos.component';

describe('EmptyPhotosComponent', () => {
  let component: EmptyPhotosComponent;
  let fixture: ComponentFixture<EmptyPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyPhotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
