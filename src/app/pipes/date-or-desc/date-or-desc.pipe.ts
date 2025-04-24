import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import { TAdditionalRowData } from '../../components/output-table/output-table.types';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'dateOrDesc',
})
export class DateOrDescPipe implements PipeTransform {

  private readonly datePipe: DatePipe;

  public constructor (@Inject(LOCALE_ID) locale: string) {
    this.datePipe = new DatePipe(locale);
  }

  transform(row: TAdditionalRowData ): string {

    if('description' in row) {
      return row.description;
    }
    return this.datePipe.transform(row.date) || '';
  }
}
