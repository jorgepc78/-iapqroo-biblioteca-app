import { NgModule              } from '@angular/core';
import { CommonModule          } from '@angular/common';
import { ReactiveFormsModule   } from '@angular/forms';
import { SweetAlertService     } from 'ngx-sweetalert2';

import { MiPerfilComponent     } from './mi-perfil.component';
import { MiPerfilRoutingModule } from './mi-perfil-routing.module';

import { MiPerfilService       } from './mi-perfil.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MiPerfilRoutingModule
  ],
  declarations: [MiPerfilComponent],
  providers: [SweetAlertService, MiPerfilService]
})
export class MiPerfilModule { }
