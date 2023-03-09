import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderPhotosComponent } from './loader-photos.component';

describe('LoaderPhotosComponent', () => {
  let component: LoaderPhotosComponent;
  let fixture: ComponentFixture<LoaderPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderPhotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
