import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepostsComponent } from './profileposts.component';

describe('ProfilepostsComponent', () => {
  let component: ProfilepostsComponent;
  let fixture: ComponentFixture<ProfilepostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilepostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilepostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
