import { NgModule                 } from '@angular/core';
import { Routes, RouterModule     } from '@angular/router';

import { AuthGuard                } from '../../core/auth.guard'
import { AdminDocumentosComponent } from './admin-documentos.component';

const routes: Routes = [{
  path: '',
  component: AdminDocumentosComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDocumentosRoutingModule { }
