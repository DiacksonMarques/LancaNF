import { TestBed } from '@angular/core/testing';

import { BillingLimitService } from './billing-limit.service';

describe('BillingLimitService', () => {
  let service: BillingLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
