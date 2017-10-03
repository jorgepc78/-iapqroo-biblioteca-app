import { NgModule             } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard            } from '../../core/auth.guard'
import { EditaVideoComponent  } from './edita-video.component';

const routes: Routes = [
  {path: 'agregavideo', component: EditaVideoComponent, canActivate: [AuthGuard]},
  {path: 'editavideo/:id', component: EditaVideoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditaVideoRoutingModule { }
