import { NgModule             } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard            } from '../../core/auth.guard'
import { AdminLibrosComponent } from './admin-libros.component';

const routes: Routes = [{
  path: '',
  component: AdminLibrosComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLibrosRoutingModule { }
