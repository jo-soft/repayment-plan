import { DateOrDescPipe } from './date-or-desc.pipe';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TAdditionalRowData } from '../../components/output-table/output-table.types';

describe('DateOrDescPipe', () => {
  let pipe: DateOrDescPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOCALE_ID, useValue: 'en-US' } // Set a default locale
      ]
    });
    pipe = new DateOrDescPipe(TestBed.inject(LOCALE_ID));
  });

  it('should return the description if present', () => {
    const row: TAdditionalRowData = {
      description: 'Test Description',
      remainingDebt: 100000,
      interest: 500,
      repayment: 1000,
      rate: 1500
    };
    const result = pipe.transform(row);
    expect(result).toBe('Test Description');
  });

  it('should format the date if description is not present', () => {
    const row: TAdditionalRowData = {
      date: new Date('2023-01-01'),
      remainingDebt: 100000,
      interest: 500,
      repayment: 1000,
      rate: 1500
    };
    const result = pipe.transform(row);
    expect(result).toBe('Jan 1, 2023'); // Default Angular date format for en-US
  });
});