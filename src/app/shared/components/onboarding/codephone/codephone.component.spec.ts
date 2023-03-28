import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodephoneComponent } from './codephone.component';

describe('CodephoneComponent', () => {
  let component: CodephoneComponent;
  let fixture: ComponentFixture<CodephoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodephoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
