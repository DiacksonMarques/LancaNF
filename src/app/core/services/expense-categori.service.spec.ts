import { TestBed } from '@angular/core/testing';

import { ExpenseCategoriService } from './expense-categori.service';

describe('ExpenseCategoriService', () => {
  let service: ExpenseCategoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseCategoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
