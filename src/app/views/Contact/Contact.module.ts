import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './Contact.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContactComponent],
  exports: [ContactComponent]
})
export class ContactModule { }
