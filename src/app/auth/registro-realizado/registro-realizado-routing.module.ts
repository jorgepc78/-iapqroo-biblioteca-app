import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroRealizadoComponent } from './registro-realizado.component';

const routes: Routes = [
  { path: '', component: RegistroRealizadoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRealizadoRoutingModule { }
