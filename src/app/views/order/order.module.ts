import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatFormFieldModule,
  MatInputModule, MatDatepickerInput, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatAutocompleteModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'src/app/shared/component/confirmDialog/confirmDialog.module';


@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    ConfirmDialogModule
  ],
  exports: [OrderComponent]
})
export class OrderModule { }
