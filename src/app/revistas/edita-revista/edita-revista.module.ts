import { NgModule                  } from '@angular/core';
import { CommonModule              } from '@angular/common';
import { ReactiveFormsModule       } from '@angular/forms';

import { SweetAlertService         } from 'ngx-sweetalert2';

import { SharedModule              } from '../../shared/shared.module';

import { EditaRevistaComponent     } from './edita-revista.component';
import { EditaRevistaRoutingModule } from './edita-revista-routing.module';
import { EditaRevistaService       } from './edita-revista.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, EditaRevistaRoutingModule],
  declarations: [EditaRevistaComponent],
  providers: [SweetAlertService, EditaRevistaService]
})
export class EditaRevistaModule { }
