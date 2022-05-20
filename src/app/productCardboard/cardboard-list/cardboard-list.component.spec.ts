import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardboardListComponent } from './cardboard-list.component';

describe('CardboardListComponent', () => {
  let component: CardboardListComponent;
  let fixture: ComponentFixture<CardboardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardboardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
