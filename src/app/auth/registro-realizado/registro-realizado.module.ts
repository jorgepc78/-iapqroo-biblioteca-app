import { NgModule                       } from '@angular/core';
import { CommonModule                   } from '@angular/common';
import { RegistroRealizadoComponent     } from './registro-realizado.component';

import { RegistroRealizadoRoutingModule } from './registro-realizado-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RegistroRealizadoRoutingModule
  ],
  declarations: [RegistroRealizadoComponent]
})
export class RegistroRealizadoModule { }
