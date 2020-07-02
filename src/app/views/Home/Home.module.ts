
import { NgModule } from '@angular/core';
import { HomeComponent } from './Home.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuickOrderModule } from 'src/app/components/quick-order/quick-order.module';
import { MatCardModule } from '@angular/material/card';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        QuickOrderModule,
        MatButtonModule,
        MatCardModule,
        CarouselModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [HomeComponent]
})
export class HomeModule { }
