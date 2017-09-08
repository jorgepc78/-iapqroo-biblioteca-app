import { NgModule                       } from '@angular/core';
import { CommonModule                   } from '@angular/common';
import { ReactiveFormsModule            } from '@angular/forms';

import { SweetAlertService              } from 'ngx-sweetalert2';

import { FroalaEditorModule, FroalaViewModule   } from 'angular-froala-wysiwyg';

import { SharedModule                   } from '../../shared/shared.module';

import { EditaPresentacionComponent     } from './edita-presentacion.component';
import { EditaPresentacionRoutingModule } from './edita-presentacion-routing.module';
import { EditaPresentacionService       } from './edita-presentacion.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, EditaPresentacionRoutingModule, FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()],
  declarations: [EditaPresentacionComponent],
  providers: [SweetAlertService, EditaPresentacionService]
})
export class EditaPresentacionModule { }
