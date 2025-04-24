import { TestBed } from '@angular/core/testing';
import { RepaymentCalculatorService } from './repayment-calculator.service';
import { IContractDetails, IRepaymentData } from './repayment-calculator.types';

describe('RepaymentCalculatorService', () => {
  let service: RepaymentCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepaymentCalculatorService);
  });

  it('should calculate correct values for 5 random rows and the final row', () => {
    const startDate = new Date('2025-04-30');
    const contractDetails: IContractDetails = {
      amount: 100000,
      normalInterestRate: 0.212,
      repaymentRate: 0.02,
      fixedInterestRate: 10
    };

    const result: IRepaymentData[] = service.calculateRepaymentPlan(startDate, contractDetails);

    // Check 5 random rows
    const indexesToCheck = [0, 10, 50, 100, 119]; // Example random rows
    const expectedValues = [
      { remainingDebt: 99833.33, interest: 1766.67, repayment: 166.67, rate: 1933.33 },
      { remainingDebt: 97995.828, interest: 1734.767, repayment: 198.565, rate: 1933.33 },
      { remainingDebt: 86388.938, interest: 1533.27, repayment: 400.06, rate: 1933.33 },
      { remainingDebt: 54117.468, interest: 973.040, repayment: 960.29, rate: 1933.33 },
      { remainingDebt: 32279.67, interest: 593.936, repayment: 1339.396, rate: 1933.33 }
    ];

    indexesToCheck.forEach((index, i) => {
      expect(result[index].remainingDebt).toBeCloseTo(expectedValues[i].remainingDebt, 2);
      expect(result[index].interest).toBeCloseTo(expectedValues[i].interest, 2);
      expect(result[index].repayment).toBeCloseTo(expectedValues[i].repayment, 2);
      expect(result[index].rate).toBeCloseTo(expectedValues[i].rate, 2);
    });

  });

  it('should return an empty array if fixedInterestRate is 0', () => {
    const startDate = new Date('2025-04-30');
    const contractDetails: IContractDetails = {
      amount: 100000,
      normalInterestRate: 0.212,
      repaymentRate: 0.02,
      fixedInterestRate: 0
    };

    const result: IRepaymentData[] = service.calculateRepaymentPlan(startDate, contractDetails);

    expect(result).toEqual([]);
  });
});