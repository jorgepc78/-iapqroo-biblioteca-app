import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTemasComponent } from './lista-temas.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ListaTemasComponent],
  exports: [ListaTemasComponent]
})
export class ListaTemasModule { }
