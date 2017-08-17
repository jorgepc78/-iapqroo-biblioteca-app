import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/auth.guard'
import { EditaRevistaComponent } from './edita-revista.component';

const routes: Routes = [
  { path: 'agregarevista', component: EditaRevistaComponent, canActivate: [AuthGuard] },
  { path: 'editarevista/:id', component: EditaRevistaComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditaRevistaRoutingModule { }
