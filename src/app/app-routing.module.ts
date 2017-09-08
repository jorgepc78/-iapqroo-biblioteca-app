import { NgModule                                } from '@angular/core';
import { CommonModule                            } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ContainerComponent                      } from './core/container/container.component';
import { ConfirmacionGuard                       } from './core/confirmacion.guard';

export const routes: Routes = [
  { path: ''                      , redirectTo: 'login', pathMatch: 'full'},
  { path: 'registro'              , loadChildren: './registro/registro.module#RegistroModule' },
  { path: 'registro-realizado'    , loadChildren: './registro-realizado/registro-realizado.module#RegistroRealizadoModule', canActivate: [ConfirmacionGuard] },
  { path: 'confirmacion-registro' , loadChildren: './confirmacion-registro/confirmacion-registro.module#ConfirmacionRegistroModule' },
  { path: 'recupera-password'     , loadChildren: './recupera-password/recupera-password.module#RecuperaPasswordModule' },
  { path: 'reset-password'        , loadChildren: './reset-password/reset-password.module#ResetPasswordModule' },
  {
    path: 'principal', component: ContainerComponent,
    children: [
      { path: 'miperfil'               , loadChildren: './mi-perfil/mi-perfil.module#MiPerfilModule' }                                                          ,

      { path: 'adminlibros'            , loadChildren: './libros/admin-libros/admin-libros.module#AdminLibrosModule' }                                          ,
      { path: 'detallelibro'           , loadChildren: './libros/edita-libro/edita-libro.module#EditaLibroModule' }                                             ,

      { path: 'adminpublicaciones'     , loadChildren: './publicaciones/admin-publicaciones/admin-publicaciones.module#AdminPublicacionesModule' }              ,
      { path: 'detallepublicacion'     , loadChildren: './publicaciones/edita-publicacion/edita-publicacion.module#EditaPublicacionModule' }                    ,

      { path: 'adminrevistas'          , loadChildren: './revistas/admin-revistas/admin-revistas.module#AdminRevistasModule' }                                  ,
      { path: 'detallerevista'         , loadChildren: './revistas/edita-revista/edita-revista.module#EditaRevistaModule' }                                     ,

      { path: 'adminpresentaciones'    , loadChildren: './presentaciones/admin-presentaciones/admin-presentaciones.module#AdminPresentacionesModule' }          ,
      { path: 'detallepresentacion'    , loadChildren: './presentaciones/edita-presentacion/edita-presentacion.module#EditaPresentacionModule' }                ,

      { path: 'consultalibros'         , loadChildren: './libros/consulta-libros/consulta-libros.module#ConsultaLibrosModule' }                                 ,
      { path: 'consultarevistas'       , loadChildren: './revistas/consulta-revistas/consulta-revistas.module#ConsultaRevistasModule' }                         ,
      { path: 'consultapublicaciones'  , loadChildren: './publicaciones/consulta-publicaciones/consulta-publicaciones.module#ConsultaPublicacionesModule' }     ,
      { path: 'consultapresentaciones' , loadChildren: './presentaciones/consulta-presentaciones/consulta-presentaciones.module#ConsultaPresentacionesModule' } ,
      
      { path: 'documento'              , loadChildren: './visor-documentos/visor-documentos.module#VisorDocumentosModule' },
      
      { path: 'admincatalogo/:tipo'    , loadChildren: './admin-categorias/admin-categorias.module#AdminCategoriasModule' }
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
