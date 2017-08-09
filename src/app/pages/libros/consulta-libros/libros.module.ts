import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosRoutingModule } from './libros-routing.module';

import { ListaTemasModule } from '../../shared/lista-temas/lista-temas.module';

import { LibrosComponent } from './libros.component';

@NgModule({
  imports: [
    CommonModule,
    ListaTemasModule,
    LibrosRoutingModule
  ],
  declarations: [LibrosComponent]
})
export class LibrosModule { }
