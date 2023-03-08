import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategoriComponent } from './expense-categori.component';

describe('ExpenseCategoriComponent', () => {
  let component: ExpenseCategoriComponent;
  let fixture: ComponentFixture<ExpenseCategoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseCategoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseCategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
