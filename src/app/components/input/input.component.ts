import {Component, inject, input, Input, ViewChild} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl, FormControlDirective,
  FormGroupDirective,
  NG_VALUE_ACCESSOR, ReactiveFormsModule
} from "@angular/forms";
import {TInputValidationErrorMessages} from "./input.types";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-input',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: InputComponent
    }
  ]
})
export class InputComponent implements ControlValueAccessor{

  @Input() public label: string = '';
  @Input() public type: string = 'text';
  @Input({ required: true }) public formControlName!: string
  @Input() public validationMessages: TInputValidationErrorMessages | null = null;

  @ViewChild(FormControlDirective, {static: false}) formControlDirective: FormControlDirective | null = null;

  private readonly controlContainer: FormGroupDirective =  inject(FormGroupDirective, {
    skipSelf: true
  });

  public get errorMessage(): string | null {
    if (!this.formControl.errors || !this.validationMessages) {
      return null;
    }

    const errorMessages: TInputValidationErrorMessages = this.validationMessages || {};
    const errorCodes: string[] = Object.keys(this.formControl.errors);

    return this.filterMessagesByCode(errorMessages, errorCodes, this.formControl.touched)[0] || null;
  }


  public get formControl(): FormControl {
    return  this.controlContainer.form.controls[this.formControlName] as FormControl;
  }

  public registerOnTouched(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
  }

  public registerOnChange(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnChange(fn);
  }

  public writeValue(obj: any): void {
    this.formControlDirective?.valueAccessor?.writeValue(obj);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.formControlDirective?.valueAccessor?.setDisabledState!(isDisabled);
  }
  private filterMessagesByCode(
      errorMessages: TInputValidationErrorMessages, errorCodes: string[], isTouched: boolean,
  ): string[] {
    return isTouched ? errorCodes
            .map((code: string) => errorMessages[code])
            .filter((errorOption: string) => !!errorOption)
        : []
  }

  protected readonly input = input;
}