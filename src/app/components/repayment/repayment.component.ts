import {Component, inject} from '@angular/core';
import {FormComponent} from "../form/form.component";
import {OutputTableComponent} from "../output-table/output-table.component";
import { RepaymentCalculatorService } from '../../services/repayment-calculator/repayment-calculator.service';
import { lastDayOfMonth } from 'date-fns';
import {IContractDetails, IRepaymentData} from "../../services/repayment-calculator/repayment-calculator.types";
import {IRowWithDescription} from "../output-table/output-table.types";

@Component({
  selector: 'app-repayment',
  imports: [
    FormComponent,
    OutputTableComponent
  ],
  templateUrl: './repayment.component.html',
  styleUrl: './repayment.component.scss'
})
export class RepaymentComponent {

  public repayments: IRepaymentData[] = [];

  public firstRow: IRepaymentData | null = null;
  public lastRow: IRowWithDescription | null = null;


  private readonly calculator: RepaymentCalculatorService = inject(RepaymentCalculatorService);

  public onValueChange(values: IContractDetails | null): void {
    if (values) {
      const startDate: Date = lastDayOfMonth(new Date());

      this.repayments = this.calculator.calculateRepaymentPlan(startDate, {
        amount: values.amount,
        fixedInterestRate: values.fixedInterestRate,
        normalInterestRate: values.normalInterestRate / 100,
        repaymentRate: values.repaymentRate / 100,
      })

      this.firstRow = {
        date: startDate,
        remainingDebt: -values.amount,
        interest: 0,
        rate: -values.amount,
        repayment: -values.amount
      }


      // Math.sumPrecise is not yet widely supported
      const remainingDebt: number = this.repayments[this.repayments.length - 1].remainingDebt;
      const totalInterest: number = this.repayments.reduce((acc: number, repayment: IRepaymentData) => acc + repayment.interest, 0);
      const totalRepayment: number = this.repayments.reduce((acc: number, repayment: IRepaymentData) => acc + repayment.repayment, 0);
      const totalRate: number = totalRepayment + totalInterest;
      this.lastRow = {
        description: 'Zinsbbindungsende',
        remainingDebt,
        interest: totalInterest,
        rate: totalRate,
        repayment: totalRepayment
      }
    }
    else {
        this.repayments = [];
        this.firstRow = null;
        this.lastRow = null;
    }
  }
}
