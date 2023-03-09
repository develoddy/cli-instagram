import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsLoadersComponent } from './posts-loaders.component';

describe('PostsLoadersComponent', () => {
  let component: PostsLoadersComponent;
  let fixture: ComponentFixture<PostsLoadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsLoadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsLoadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
