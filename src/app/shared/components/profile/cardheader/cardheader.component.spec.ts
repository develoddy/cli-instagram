import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardheaderComponent } from './cardheader.component';

describe('CardheaderComponent', () => {
  let component: CardheaderComponent;
  let fixture: ComponentFixture<CardheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
