import { NgModule                } from '@angular/core';
import { CommonModule            } from '@angular/common';
import { ReactiveFormsModule     } from '@angular/forms';

import { SweetAlertService       } from 'ngx-sweetalert2';

import { FroalaEditorModule, FroalaViewModule   } from 'angular-froala-wysiwyg';

import { SharedModule            } from '../../shared/shared.module';

import { EditaLibroComponent     } from './edita-libro.component';
import { EditaLibroRoutingModule } from './edita-libro-routing.module';
import { EditaLibroService       } from './edita-libro.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, EditaLibroRoutingModule, FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()],
  declarations: [EditaLibroComponent],
  providers: [SweetAlertService, EditaLibroService]
})
export class EditaLibroModule { }
