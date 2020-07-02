import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './Contact.component';

@NgModule({
  imports: [
    CommonModule

  ],
  declarations: [ContactComponent],
  exports: [ContactComponent]
})
export class ContactModule { }
