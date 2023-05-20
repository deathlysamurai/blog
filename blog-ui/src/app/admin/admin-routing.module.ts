import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from '../shared/guards/can-activate-admin.guard';
import { AdminIndexComponent } from './admin-index/admin-index.component';

const routes: Routes = [
    { path: '', 
        component: AdminIndexComponent,
        canActivate: [ CanActivateAdminGuard ],
        children: [
          { path: '', loadChildren: () => import('./admin-routes/admin-routes.module').then((m) => m.AdminRoutesModule) },
        ]
    }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateAdminGuard ]
})
export class AdminRoutingModule { 
  static components = [ AdminIndexComponent ];
}