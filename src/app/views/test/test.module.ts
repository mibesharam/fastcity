import { NgModule } from '@angular/core';
import { TestComponent } from './test.component';

import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [TestComponent],
    exports: [TestComponent]
})
export class TestModule { }