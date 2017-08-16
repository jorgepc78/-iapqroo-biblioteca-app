import { NgModule                                } from '@angular/core';
import { CommonModule                            } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CoreComponent                           } from './core/core.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'principal', component: CoreComponent,
    children: [
      { path: 'libros', loadChildren: './libros/consulta-libros/libros.module#LibrosModule' },
      
      { path: 'adminlibros', loadChildren: './libros/admin-libros/admin-libros.module#AdminLibrosModule' },
      { path: 'detallelibro', loadChildren: './libros/edita-libro/edita-libro.module#EditaLibroModule' },

      { path: 'adminpublicaciones', loadChildren: './publicaciones/admin-publicaciones/admin-publicaciones.module#AdminPublicacionesModule' },
      { path: 'detallepublicacion', loadChildren: './publicaciones/edita-publicacion/edita-publicacion.module#EditaPublicacionModule' },

      { path: 'miperfil', loadChildren: './mi-perfil/mi-perfil.module#MiPerfilModule' }
    ]
  }
  //{ path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {} )],
  //imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
