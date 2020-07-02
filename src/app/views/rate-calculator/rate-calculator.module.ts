import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateCalculatorComponent } from './rate-calculator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RateCalculatorComponent],
  exports: [RateCalculatorComponent]
})
export class RateCalculatorModule { }
