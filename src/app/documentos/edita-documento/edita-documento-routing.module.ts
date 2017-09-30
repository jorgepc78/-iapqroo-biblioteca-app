import { NgModule             } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard            } from '../../core/auth.guard'
import { EditaDocumentoComponent  } from './edita-documento.component';

const routes: Routes = [
  {path: 'agregadocumento', component: EditaDocumentoComponent, canActivate: [AuthGuard]},
  {path: 'editadocumento/:id', component: EditaDocumentoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditaDocumentoRoutingModule { }
