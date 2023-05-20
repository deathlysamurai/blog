import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from 'src/app/shared/guards/can-activate-admin.guard';
import { MovesCreateMoveComponent } from './moves-create-move/moves-create-move.component';
import { MovesShowAllComponent } from './moves-show-all/moves-show-all.component';
import { MovesIndexComponent } from './moves-index/moves-index.component';

const routes: Routes = [
  { path: '', 
    component: MovesIndexComponent,
    canActivate: [ CanActivateAdminGuard ],
    children: [
      { path: '', 
        component: MovesShowAllComponent,
        canActivate: [ CanActivateAdminGuard ]
      },
      { path: 'moves-create-move', 
        component: MovesCreateMoveComponent,
        canActivate: [ CanActivateAdminGuard ]  
      },
      // { path: 'moves-character-move/:id', 
      //   component: MovesCharacterPageComponent,
      //   canActivate: [ CanActivateAdminGuard ]  
      // },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateAdminGuard ]
})
export class MovesRoutingModule { 
  static components = [ MovesShowAllComponent, 
                        MovesCreateMoveComponent,
                        MovesIndexComponent
                      ];
}