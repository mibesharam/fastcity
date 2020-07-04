import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackComponent } from './track.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [TrackComponent],
  exports: [TrackComponent]
})
export class TrackModule { }
