import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';


@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [OrderComponent]
})
export class OrderModule { }
