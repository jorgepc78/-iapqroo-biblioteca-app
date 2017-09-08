import { NgModule             } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard            } from '../core/auth.guard'
import { AdminCategoriasComponent } from './admin-categorias.component';

const routes: Routes = [{
  path: '',
  component: AdminCategoriasComponent,
  canActivate: [AuthGuard]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCategoriasRoutingModule { }
