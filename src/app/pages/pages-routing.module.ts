import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: 'principal', component: PagesComponent,
  children: [
    { path: 'libros', loadChildren: './libros/consulta-libros/libros.module#LibrosModule' },
    { path: 'adminlibros', loadChildren: './libros/admin-libros/admin-libros.module#AdminLibrosModule' },
    { path: 'detallelibro', loadChildren: './libros/edita-libro/edita-libro.module#EditaLibroModule' },

    { path: 'miperfil', loadChildren: './mi-perfil/mi-perfil.module#MiPerfilModule' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
