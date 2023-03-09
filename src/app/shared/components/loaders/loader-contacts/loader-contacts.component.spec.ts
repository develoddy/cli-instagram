import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderContactsComponent } from './loader-contacts.component';

describe('LoaderContactsComponent', () => {
  let component: LoaderContactsComponent;
  let fixture: ComponentFixture<LoaderContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
