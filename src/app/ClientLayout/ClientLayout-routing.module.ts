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
import { ClientDashboardComponent } from '../views/clientDashboard/client-dashboard/client-dashboard.component';
import { AuthGuard } from '../shared/helpers/auth.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { MapPickComponent } from '../shared/component/map-pick/map-pick.component';



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
                path: 'auth/verify',
                component: SigninComponent,
                data: { isVerification: true }
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
            },
            {
                path: 'dashboard',
                component: ClientDashboardComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'googleMap',
                component: MapPickComponent
            }
        ]
    },
    {
        path: '**',
        component: ClientLayoutComponent,
        children: [
            {
                path: '',
                component: NotFoundComponent
            }
        ]
    }
];

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
