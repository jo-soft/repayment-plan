import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepaymentComponent } from './repayment.component';
import { RepaymentCalculatorService } from '../../services/repayment-calculator/repayment-calculator.service';
import { IContractDetails, IRepaymentData } from '../../services/repayment-calculator/repayment-calculator.types';
import {lastDayOfMonth} from "date-fns";

describe('RepaymentComponent', () => {
  let component: RepaymentComponent;
  let fixture: ComponentFixture<RepaymentComponent>;
  let mockCalculatorService: jasmine.SpyObj<RepaymentCalculatorService>;

  let mockRepayments: IRepaymentData[];
  let contractDetails: IContractDetails;

  beforeEach(async () => {
    mockCalculatorService = jasmine.createSpyObj(RepaymentCalculatorService.name, ['calculateRepaymentPlan']);

    contractDetails = {
      amount: 100000,
      fixedInterestRate: 1.5,
      normalInterestRate: 3.0,
      repaymentRate: 2.0
    };


    mockRepayments = [
      {date: new Date('2023-01-01'), remainingDebt: 90000, interest: 500, repayment: 1000, rate: 1500},
      {date: new Date('2023-02-01'), remainingDebt: 89000, interest: 495, repayment: 1005, rate: 1500}
    ];
    mockCalculatorService.calculateRepaymentPlan.and.returnValue(mockRepayments);

    await TestBed.configureTestingModule({
      imports: [RepaymentComponent],
      providers: [
        {provide: RepaymentCalculatorService, useValue: mockCalculatorService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepaymentComponent);
    component = fixture.componentInstance;
  });

  describe('onValueChange', () => {

    it('should assign repayments, firstRow, and lastRow properly on valid input', () => {
      component.onValueChange(contractDetails);

      expect(component.repayments).toEqual(mockRepayments);
      expect(component.firstRow).toEqual({
        date: jasmine.any(Date),
        remainingDebt: -100000,
        interest: 0,
        rate: -100000,
        repayment: -100000
      });
      expect(component.lastRow).toEqual({
        description: 'Zinsbbindungsende',
        remainingDebt: 89000,
        interest: 995,
        rate: 3000,
        repayment: 2005
      });
    });

    it('calls RepaymentCalculatorService.calculateRepaymentPlan with the expected values', () => {
      const mockDate = new Date('2025-04-23');
      jasmine.clock().install();
      jasmine.clock().mockDate(mockDate);

      component.onValueChange(contractDetails);

      const expectedDate: Date = lastDayOfMonth(new Date(mockDate));

      expect(mockCalculatorService.calculateRepaymentPlan).toHaveBeenCalledWith(expectedDate, {
        amount: contractDetails.amount,
        fixedInterestRate: contractDetails.fixedInterestRate,
        normalInterestRate: contractDetails.normalInterestRate / 100,
        repaymentRate: contractDetails.repaymentRate / 100,
      });

      jasmine.clock().uninstall();
    })

    it('should reset repayments, firstRow, and lastRow on null input', () => {
      component.onValueChange(null);

      expect(component.repayments).toEqual([]);
      expect(component.firstRow).toBeNull();
      expect(component.lastRow).toBeNull();
    });
  });
});