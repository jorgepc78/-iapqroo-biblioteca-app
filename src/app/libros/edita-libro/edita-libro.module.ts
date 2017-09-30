import { NgModule                } from '@angular/core';
import { CommonModule            } from '@angular/common';
import { ReactiveFormsModule     } from '@angular/forms';

import { SweetAlertService       } from 'ngx-sweetalert2';

import { SharedModule            } from '../../shared/shared.module';

import { EditaLibroComponent     } from './edita-libro.component';
import { EditaLibroService       } from './edita-libro.service';
import { EditaLibroRoutingModule } from './edita-libro-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, EditaLibroRoutingModule],
  declarations: [EditaLibroComponent],
  providers: [SweetAlertService, EditaLibroService]
})
export class EditaLibroModule { }
