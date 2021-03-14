import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatInputModule, MatCardModule } from '@angular/material';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShippingCalcComponent } from './component/shipping-calc/shipping-calc.component';
import { MapPickModule } from './component/map-pick/map-pick.module';



@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MapPickModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MapPickModule
  ]
})
export class SharedModule { }
