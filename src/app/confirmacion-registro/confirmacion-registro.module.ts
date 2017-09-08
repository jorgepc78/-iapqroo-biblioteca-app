import { NgModule                          } from '@angular/core';
import { CommonModule                      } from '@angular/common';
import { ReactiveFormsModule               } from '@angular/forms';
import { ConfirmacionRegistroComponent     } from './confirmacion-registro.component';
import { ConfirmacionRegistroService       } from './confirmacion-registro.service';
import { ConfirmacionRegistroRoutingModule } from './confirmacion-registro-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ConfirmacionRegistroRoutingModule],
  declarations: [ConfirmacionRegistroComponent],
  providers: [ConfirmacionRegistroService]
})
export class ConfirmacionRegistroModule { }
