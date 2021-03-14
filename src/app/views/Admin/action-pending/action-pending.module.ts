import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionPendingComponent } from './action-pending.component';
import {
  MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule,
  MatTableModule,
  MatButtonModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatDialogModule,
  MatProgressBarModule,
  MatCheckboxModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionDialogComponent } from './actionDialog/actionDialog.component';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  declarations: [
    ActionPendingComponent,
    ActionDialogComponent
  ],
  entryComponents: [ActionDialogComponent]
})
export class ActionPendingModule { }
