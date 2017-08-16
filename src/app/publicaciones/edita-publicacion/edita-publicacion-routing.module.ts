import { NgModule                  } from '@angular/core';
import { Routes, RouterModule      } from '@angular/router';

import { AuthGuard                 } from '../../core/auth.guard'
import { EditaPublicacionComponent } from './edita-publicacion.component';

const routes: Routes = [
  { path: 'agregapublicacion', component: EditaPublicacionComponent, canActivate: [AuthGuard] },
  { path: 'editapublicacion/:id', component: EditaPublicacionComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditaPublicacionRoutingModule { }
