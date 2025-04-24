import { Component, Input } from '@angular/core';
import { IRepaymentData } from '../../services/repayment-calculator/repayment-calculator.types';
import {CurrencyPipe, DatePipe} from "@angular/common";
import {TAdditionalRowData} from "./output-table.types";
import {DateOrDescPipe} from "../../pipes/date-or-desc/date-or-desc.pipe";

@Component({
  selector: 'app-output-table',
  imports: [
    DatePipe,
    CurrencyPipe,
    DateOrDescPipe
  ],
  templateUrl: './output-table.component.html',
  styleUrl: './output-table.component.scss'
})
export class OutputTableComponent {


  @Input({ required: true}) public repayments: IRepaymentData[] = [];
  @Input() firstRow: TAdditionalRowData | null = null;
  @Input() lastRow: TAdditionalRowData | null = null;
}
