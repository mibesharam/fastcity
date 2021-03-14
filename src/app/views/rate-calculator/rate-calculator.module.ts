import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateCalculatorComponent } from './rate-calculator.component';
import {
  MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatAutocompleteModule,
  MatSnackBarModule, MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShippingCalcModule } from 'src/app/shared/component/shipping-calc/shipping-calc.module';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FormsModule,
    ShippingCalcModule
  ],
  declarations: [RateCalculatorComponent],
  exports: [RateCalculatorComponent]

})
export class RateCalculatorModule { }
