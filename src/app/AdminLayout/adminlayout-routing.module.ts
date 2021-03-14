import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminDashboardComponent } from '../views/Admin/admin-dashboard/admin-dashboard.component';
import { OrderListComponent } from '../views/Admin/OrderList/OrderList.component';
import { ActionPendingComponent } from '../views/Admin/action-pending/action-pending.component';



const path: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: AdminDashboardComponent
            },
            {
                path: 'orderlist',
                component: OrderListComponent
            },
            {
                path: 'action',
                component: ActionPendingComponent
            }
        ]
    },
    {
        path: '**',
        component: AdminLayoutComponent,
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
export class AdminLayoutRoutingModule { }
