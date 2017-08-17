import { NgModule                   } from '@angular/core';
import { Routes, RouterModule       } from '@angular/router';

import { AuthGuard                  } from '../../core/auth.guard'
import { EditaPresentacionComponent } from './edita-presentacion.component';

const routes: Routes = [
  { path: 'agregapresentacion', component: EditaPresentacionComponent, canActivate: [AuthGuard] },
  { path: 'editapresentacion/:id', component: EditaPresentacionComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditaPresentacionRoutingModule { }
