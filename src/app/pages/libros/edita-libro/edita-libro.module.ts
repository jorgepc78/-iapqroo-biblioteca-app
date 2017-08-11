import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlertService } from 'ngx-sweetalert2';

import { FileSelectDirective } from 'ng2-file-upload';

import { EditaLibroComponent } from './edita-libro.component';
import { EditaLibroRoutingModule } from './edita-libro-routing.module';
import { LibrosService } from '../../../_services/libros.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, EditaLibroRoutingModule],
  declarations: [FileSelectDirective, EditaLibroComponent],
  providers: [SweetAlertService, LibrosService]
})
export class EditaLibroModule { }
