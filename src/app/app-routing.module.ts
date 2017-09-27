import { NgModule                                } from '@angular/core';
import { CommonModule                            } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ContainerComponent                      } from './core/container/container.component';
import { ConfirmacionGuard                       } from './core/confirmacion.guard';

export const routes: Routes = [
  { path: ''                      , redirectTo: 'login', pathMatch: 'full'},
  { path: 'registro'              , loadChildren: './auth/registro/registro.module#RegistroModule' },
  { path: 'registro-realizado'    , loadChildren: './auth/registro-realizado/registro-realizado.module#RegistroRealizadoModule', canActivate: [ConfirmacionGuard] },
  { path: 'confirmacion-registro' , loadChildren: './auth/confirmacion-registro/confirmacion-registro.module#ConfirmacionRegistroModule' },
  { path: 'recupera-password'     , loadChildren: './auth/recupera-password/recupera-password.module#RecuperaPasswordModule' },
  { path: 'reset-password'        , loadChildren: './auth/reset-password/reset-password.module#ResetPasswordModule' },
  {
    path: 'principal', component: ContainerComponent,
    children: [
      { path: 'miperfil'               , loadChildren: './mi-perfil/mi-perfil.module#MiPerfilModule' },

      { path: 'administracion/:tipo'   , loadChildren: './documentos/admin-documentos/admin-documentos.module#AdminDocumentosModule' },
      { path: 'editadocumento'         , loadChildren: './documentos/edita-documento/edita-documento.module#EditaDocumentoModule' },
      { path: 'editavideo'             , loadChildren: './documentos/edita-video/edita-video.module#EditaVideoModule' },
      { path: 'consulta/:tipo'         , loadChildren: './documentos/consulta-documentos/consulta-documentos.module#ConsultaDocumentosModule' },
      { path: 'visordocumento'         , loadChildren: './documentos/visor-documentos/visor-documentos.module#VisorDocumentosModule' },
      
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
