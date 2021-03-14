import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminDashboardModule } from '../views/Admin/admin-dashboard/admin-dashboard.module';
import { AdminLayoutRoutingModule } from './adminlayout-routing.module';
import { SharedModule } from '../shared/shared.module';
import {
  MatToolbarModule, MatIconModule, MatButtonModule,
  MatSidenavModule, MatExpansionModule, MatSnackBarModule
} from '@angular/material';
import { OrderListModule } from '../views/Admin/OrderList/OrderList.module';
import { ActionPendingModule } from '../views/Admin/action-pending/action-pending.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    AdminDashboardModule,
    OrderListModule,
    ActionPendingModule,
    AdminLayoutRoutingModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSnackBarModule,
    NgxSpinnerModule
  ],
  declarations: [AdminLayoutComponent],
  exports: [AdminLayoutRoutingModule]
})
export class AdminLayoutModule { }
