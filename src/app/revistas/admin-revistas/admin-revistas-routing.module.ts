import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/auth.guard'
import { AdminRevistasComponent } from './admin-revistas.component';

const routes: Routes = [{
  path: '',
  component: AdminRevistasComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRevistasRoutingModule { }
