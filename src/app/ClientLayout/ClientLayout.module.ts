import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutComponent } from './ClientLayout.component';
import { SharedModule } from '../shared/shared.module';
import { ClientLayoutRoutingModule } from './ClientLayout-routing.module';
import { ContactModule } from '../views/Contact/Contact.module';
import { HomeModule } from '../views/Home/Home.module';
import { SigninModule } from '../views/signin/signin.module';
import { RegisterModule } from '../views/register/register.module';
import { RateCalculatorModule } from '../views/rate-calculator/rate-calculator.module';
import { TrackModule } from '../views/track/track.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContactModule,
    HomeModule,
    SigninModule,
    RegisterModule,
    RateCalculatorModule,
    TrackModule,
    ClientLayoutRoutingModule,
  ],
  declarations: [ClientLayoutComponent],
  exports: [ClientLayoutRoutingModule]
})
export class ClientLayoutModule { }
