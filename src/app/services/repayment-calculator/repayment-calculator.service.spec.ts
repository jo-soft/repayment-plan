import { TestBed } from '@angular/core/testing';

import { RepaymentCalculatorService } from './repayment-calculator.service';

describe('RepaymentCalculatorService', () => {
  let service: RepaymentCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepaymentCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
