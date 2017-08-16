import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth.guard'

import { MiPerfilComponent } from './mi-perfil.component';

const routes: Routes = [{
  path: '',
  component: MiPerfilComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiPerfilRoutingModule { }
