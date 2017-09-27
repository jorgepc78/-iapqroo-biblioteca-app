import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmacionRegistroComponent } from './confirmacion-registro.component';

const routes: Routes = [
  { path: '', component: ConfirmacionRegistroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmacionRegistroRoutingModule { }
