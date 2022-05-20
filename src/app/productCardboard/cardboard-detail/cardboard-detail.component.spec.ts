import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardboardDetailComponent } from './cardboard-detail.component';

describe('CardboardDetailComponent', () => {
  let component: CardboardDetailComponent;
  let fixture: ComponentFixture<CardboardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardboardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardboardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
