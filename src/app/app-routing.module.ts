import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/helpers/auth.guard';
import { AdminGuard } from './shared/helpers/admin.guard';


const routes: Routes = [
  {
    path: 'badmin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./AdminLayout/admin-layout.module').then(m => m.AdminLayoutModule)
  },
  {
    path: '',
    loadChildren: () => import('./ClientLayout/ClientLayout.module').then(m => m.ClientLayoutModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
