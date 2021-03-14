import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDashboardComponent } from './client-dashboard.component';
import {
  MatTabsModule, MatButtonModule, MatExpansionModule,
  MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatTableModule, MatIconModule, MatPaginatorModule, MatProgressBarModule
} from '@angular/material';
import { ShippingCalcModule } from 'src/app/shared/component/shipping-calc/shipping-calc.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ClientDashboardComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    ShippingCalcModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    RouterModule
  ],
  entryComponents: [OrderDetailComponent]
})
export class ClientDashboardModule { }
