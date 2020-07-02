
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickOrderComponent } from './quick-order.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
    declarations: [
        QuickOrderComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule
    ],
    exports: [QuickOrderComponent]
})
export class QuickOrderModule { }
