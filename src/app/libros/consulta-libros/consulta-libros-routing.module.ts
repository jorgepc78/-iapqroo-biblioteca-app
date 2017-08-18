import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/auth.guard'
import { ConsultaLibrosComponent } from './consulta-libros.component';

const routes: Routes = [{
  path: '',
  component: ConsultaLibrosComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaLibrosRoutingModule { }
