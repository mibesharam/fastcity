import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule
  ],
  declarations: [SigninComponent],
  exports: [SigninComponent]
})
export class SigninModule { }
