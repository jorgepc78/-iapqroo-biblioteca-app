import { NgModule                     } from '@angular/core';
import { CommonModule                 } from '@angular/common';
import { ReactiveFormsModule          } from '@angular/forms';

import { SweetAlertService            } from 'ngx-sweetalert2';

import { TreeviewModule               } from 'ngx-treeview';
import { DropdownTreeviewSelectModule } from '../../shared/dropdown-treeview-select/dropdown-treeview-select.module';

import { TinymceModule                } from 'angular2-tinymce';

import { SharedModule                 } from '../../shared/shared.module';

import { EditaVideoComponent          } from './edita-video.component';
import { EditaVideoService            } from './edita-video.service';

import { EditaVideoRoutingModule      } from './edita-video-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, EditaVideoRoutingModule, DropdownTreeviewSelectModule, TreeviewModule.forRoot(), 
      TinymceModule.withConfig({
        language: 'es_MX',
        resize: false,
        height : 200,
        max_height: 250,
        min_height: 100
      })
  ],
  declarations: [EditaVideoComponent],
  providers: [SweetAlertService, EditaVideoService]
})
export class EditaVideoModule { }
