import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackComponent } from './track.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TrackComponent],
  exports: [TrackComponent]
})
export class TrackModule { }
