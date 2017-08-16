import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/auth.guard'
import { AdminPublicacionesComponent } from './admin-publicaciones.component';

const routes: Routes = [{
  path: '',
  component: AdminPublicacionesComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPublicacionesRoutingModule { }
