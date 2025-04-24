import { addDays, endOfMonth } from 'date-fns'
import { Injectable } from '@angular/core';
import {IContractDetails, IRepaymentData} from "./repayment-calculator.types";

interface IPayment {
  remainingDebt: number;
  interest: number;
  repayment: number;
}

@Injectable({
  providedIn: 'root'
})
export class RepaymentCalculatorService {

  public calculateRepaymentPlan(startDate: Date, { amount, normalInterestRate, repaymentRate, fixedInterestRate }: IContractDetails): IRepaymentData[] {

    // number of payments
    const count: number = fixedInterestRate * 12;
    const monthlyRate: number = this.calculateMonthlyRate(amount, repaymentRate, normalInterestRate);
    return  this.calculateRates(startDate, count, amount, normalInterestRate, monthlyRate, [])
  }

  private calculateRates(
      date: Date,
      count: number,
      value: number,
      interestRate: number,
      monthlyRate: number,
      initialData: IRepaymentData[]
  ): IRepaymentData[] {
    if (count) {
      const newEntry: IRepaymentData = {
        ...this.calculateData(value, interestRate, monthlyRate),
        date: date,
        rate: monthlyRate
      };

      const newData: IRepaymentData[] = [
        ...initialData,
        newEntry
      ];
      return this.calculateRates(
          endOfMonth(addDays(date, 1)),
          count - 1,
          newEntry.remainingDebt,
          interestRate,
          monthlyRate,
          newData
      )
    }
    else {
      return initialData;
    }
  }

  private calculateData(value: number, interestRate: number, monthlyRate: number): IPayment {

    const interest: number = value * interestRate / 12;
    const repayment = monthlyRate - interest;

    return  {
      remainingDebt: value -  repayment,
      interest,
      repayment,
    }
  }

  private calculateMonthlyRate(value: number, repaymentRate: number, interestRate: number): number {
    return value * (interestRate + repaymentRate) / 12;
  }
}
