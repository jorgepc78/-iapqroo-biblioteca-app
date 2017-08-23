import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/auth.guard'
import { ConsultaRevistasComponent } from './consulta-revistas.component';

const routes: Routes = [{
  path: '',
  component: ConsultaRevistasComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRevistasRoutingModule { }
