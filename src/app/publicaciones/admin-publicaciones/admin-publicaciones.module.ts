import { NgModule                        } from '@angular/core';
import { CommonModule                    } from '@angular/common';
import { FormsModule                     } from '@angular/forms';

import { SweetAlertService               } from 'ngx-sweetalert2';
import { NgxPaginationModule             } from 'ngx-pagination';
import { PerfectScrollbarModule          } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AdminPublicacionesRoutingModule } from './admin-publicaciones-routing.module';
import { AdminPublicacionesComponent     } from './admin-publicaciones.component';
import { AdminPublicacionesService       } from './admin-publicaciones.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [CommonModule, FormsModule, NgxPaginationModule, AdminPublicacionesRoutingModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)],
  declarations: [AdminPublicacionesComponent],
  providers: [SweetAlertService, AdminPublicacionesService]
})
export class AdminPublicacionesModule { }
