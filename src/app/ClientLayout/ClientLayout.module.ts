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
import { TestModule } from '../views/test/test.module';
import { OrderModule } from '../views/order/order.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoggingService } from '../shared/services/logging.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClientDashboardModule } from '../views/clientDashboard/client-dashboard/client-dashboard.module';
import { AuthInterceptorService } from '../shared/helpers/authInterceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from '../shared/helpers/errorInterceptor.service';


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
    TestModule,
    OrderModule,
    ClientDashboardModule,
    ReactiveFormsModule,
    ClientLayoutRoutingModule,
    NgxSpinnerModule,
   
  ],
  declarations: [
    ClientLayoutComponent
  ],
  exports: [
    ClientLayoutRoutingModule
  ],
  providers: [
    LoggingService,

  ]
})
export class ClientLayoutModule { }
