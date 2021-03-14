import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatAutocompleteModule,
  MatSnackBarModule, MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShippingCalcComponent } from './shipping-calc.component';


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
    FormsModule
  ],
  declarations: [ShippingCalcComponent],
  exports: [ShippingCalcComponent]

})
export class ShippingCalcModule { }
