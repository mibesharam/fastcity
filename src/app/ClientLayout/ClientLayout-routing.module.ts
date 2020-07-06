import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../views/Home/Home.component';
import { ClientLayoutComponent } from './ClientLayout.component';
import { ContactComponent } from '../views/Contact/Contact.component';
import { SigninComponent } from '../views/signin/signin.component';
import { RegisterComponent } from '../views/register/register.component';
import { RateCalculatorComponent } from '../views/rate-calculator/rate-calculator.component';
import { TrackComponent } from '../views/track/track.component';
import { TestComponent } from '../views/test/test.component';
import { OrderComponent } from '../views/order/order.component';



const path: Routes = [
    {
        path: '',
        component: ClientLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'login',
                component: SigninComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'shipping-rate-calculator',
                component: RateCalculatorComponent
            },
            {
                path: 'track',
                component: TrackComponent
            },
            {
                path: 'order',
                component: OrderComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(path)
    ],
    exports: [
        RouterModule
    ]
})
export class ClientLayoutRoutingModule { }
