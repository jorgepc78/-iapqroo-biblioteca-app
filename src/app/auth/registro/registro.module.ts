import { NgModule              } from '@angular/core';
import { CommonModule          } from '@angular/common';
import { ReactiveFormsModule   } from '@angular/forms';

import { RegistroComponent     } from './registro.component';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroService       } from './registro.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RegistroRoutingModule],
  declarations: [RegistroComponent],
  providers: [RegistroService]
})
export class RegistroModule { }
