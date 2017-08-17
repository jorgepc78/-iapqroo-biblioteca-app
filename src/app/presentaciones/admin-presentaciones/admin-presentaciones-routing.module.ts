import { NgModule                     } from '@angular/core';
import { Routes, RouterModule         } from '@angular/router';

import { AuthGuard                    } from '../../core/auth.guard'
import { AdminPresentacionesComponent } from './admin-presentaciones.component';

const routes: Routes = [{
  path: '',
  component: AdminPresentacionesComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPresentacionesRoutingModule { }
