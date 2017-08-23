import { NgModule                       } from '@angular/core';
import { Routes, RouterModule           } from '@angular/router';

import { AuthGuard                      } from '../../core/auth.guard'
import { ConsultaPublicacionesComponent } from './consulta-publicaciones.component';

const routes: Routes = [{
  path: '',
  component: ConsultaPublicacionesComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaPublicacionesRoutingModule { }
