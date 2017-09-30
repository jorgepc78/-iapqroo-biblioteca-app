import { NgModule                } from '@angular/core';
import { Routes, RouterModule    } from '@angular/router';

import { AuthGuard               } from '../../core/auth.guard'
import { ConsultaDocumentosComponent } from './consulta-documentos.component';

const routes: Routes = [{
  path: '',
  component: ConsultaDocumentosComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaDocumentosRoutingModule { }
