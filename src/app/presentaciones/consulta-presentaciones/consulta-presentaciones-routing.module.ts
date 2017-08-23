import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/auth.guard'
import { ConsultaPresentacionesComponent } from './consulta-presentaciones.component';

const routes: Routes = [{
  path: '',
  component: ConsultaPresentacionesComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaPresentacionesRoutingModule { }
