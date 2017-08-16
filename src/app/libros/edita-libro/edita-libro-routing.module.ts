import { NgModule             } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard            } from '../../core/auth.guard'
import { EditaLibroComponent  } from './edita-libro.component';

const routes: Routes = [
  {path: 'agregalibro', component: EditaLibroComponent, canActivate: [AuthGuard]},
  {path: 'editalibro/:id', component: EditaLibroComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditaLibroRoutingModule { }
