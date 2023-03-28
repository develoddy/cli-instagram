import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterloginComponent } from './footerlogin.component';

describe('FooterloginComponent', () => {
  let component: FooterloginComponent;
  let fixture: ComponentFixture<FooterloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
