import { NgModule                        } from '@angular/core';
import { CommonModule                    } from '@angular/common';
import { FormsModule                     } from '@angular/forms';

import { SweetAlertService               } from 'ngx-sweetalert2';
import { NgxPaginationModule             } from 'ngx-pagination';
import { PerfectScrollbarModule          } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AdminDocumentosRoutingModule    } from './admin-documentos-routing.module';
import { AdminDocumentosComponent        } from './admin-documentos.component';
import { AdminDocumentosService          } from './admin-documentos.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [CommonModule, FormsModule, NgxPaginationModule, AdminDocumentosRoutingModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)],
  declarations: [AdminDocumentosComponent],
  providers: [SweetAlertService, AdminDocumentosService]
})
export class AdminDocumentosModule { }
