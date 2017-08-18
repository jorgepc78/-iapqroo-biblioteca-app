import { NgModule                                } from '@angular/core';
import { CommonModule                            } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ContainerComponent                      } from './core/container/container.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'principal', component: ContainerComponent,
    children: [
      { path: 'miperfil'            , loadChildren: './mi-perfil/mi-perfil.module#MiPerfilModule' }                                                 ,

      { path: 'adminlibros'         , loadChildren: './libros/admin-libros/admin-libros.module#AdminLibrosModule' }                                 ,
      { path: 'detallelibro'        , loadChildren: './libros/edita-libro/edita-libro.module#EditaLibroModule' }                                    ,

      { path: 'adminpublicaciones'  , loadChildren: './publicaciones/admin-publicaciones/admin-publicaciones.module#AdminPublicacionesModule' }     ,
      { path: 'detallepublicacion'  , loadChildren: './publicaciones/edita-publicacion/edita-publicacion.module#EditaPublicacionModule' }           ,

      { path: 'adminrevistas'       , loadChildren: './revistas/admin-revistas/admin-revistas.module#AdminRevistasModule' }                         ,
      { path: 'detallerevista'      , loadChildren: './revistas/edita-revista/edita-revista.module#EditaRevistaModule' }                            ,

      { path: 'adminpresentaciones' , loadChildren: './presentaciones/admin-presentaciones/admin-presentaciones.module#AdminPresentacionesModule' } ,
      { path: 'detallepresentacion' , loadChildren: './presentaciones/edita-presentacion/edita-presentacion.module#EditaPresentacionModule' }       ,

      { path: 'consultalibros'      , loadChildren: './libros/consulta-libros/consulta-libros.module#ConsultaLibrosModule' }
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
