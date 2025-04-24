import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {FormComponent} from "./components/form/form.component";
import {RepaymentComponent} from "./components/repayment/repayment.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RepaymentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}