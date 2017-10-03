import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/auth.guard'
import { VisorDocumentosComponent } from './visor-documentos.component';

const routes: Routes = [
  { path: 'documento/:id', component: VisorDocumentosComponent, canActivate: [AuthGuard] },
  { path: 'video/:id', component: VisorDocumentosComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisorDocumentosRoutingModule { }
