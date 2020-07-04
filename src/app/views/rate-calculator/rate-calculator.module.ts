import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateCalculatorComponent } from './rate-calculator.component';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  declarations: [RateCalculatorComponent],
  exports: [RateCalculatorComponent]
})
export class RateCalculatorModule { }
