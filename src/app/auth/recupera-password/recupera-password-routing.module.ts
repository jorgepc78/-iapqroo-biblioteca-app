import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecuperaPasswordComponent } from './recupera-password.component';

const routes: Routes = [
  { path: '', component: RecuperaPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperaPasswordRoutingModule { }
