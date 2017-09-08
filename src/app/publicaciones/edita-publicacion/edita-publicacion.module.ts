import { NgModule                      } from '@angular/core';
import { CommonModule                  } from '@angular/common';
import { ReactiveFormsModule           } from '@angular/forms';

import { SweetAlertService             } from 'ngx-sweetalert2';

import { FroalaEditorModule, FroalaViewModule   } from 'angular-froala-wysiwyg';

import { SharedModule                  } from '../../shared/shared.module';

import { EditaPublicacionComponent     } from './edita-publicacion.component';
import { EditaPublicacionRoutingModule } from './edita-publicacion-routing.module';
import { EditaPublicacionService       } from './edita-publicacion.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, EditaPublicacionRoutingModule, FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()],
  declarations: [EditaPublicacionComponent],
  providers: [SweetAlertService, EditaPublicacionService]
})
export class EditaPublicacionModule { }
