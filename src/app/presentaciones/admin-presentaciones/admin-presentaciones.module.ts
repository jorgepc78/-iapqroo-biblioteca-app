import { NgModule                         } from '@angular/core';
import { CommonModule                     } from '@angular/common';
import { FormsModule                      } from '@angular/forms';

import { SweetAlertService                } from 'ngx-sweetalert2';
import { NgxPaginationModule              } from 'ngx-pagination';
import { PerfectScrollbarModule           } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface  } from 'ngx-perfect-scrollbar';

import { AdminPresentacionesRoutingModule } from './admin-presentaciones-routing.module';
import { AdminPresentacionesComponent     } from './admin-presentaciones.component';
import { AdminPresentacionesService       } from './admin-presentaciones.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [CommonModule, FormsModule, NgxPaginationModule, AdminPresentacionesRoutingModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)],
  declarations: [AdminPresentacionesComponent],
  providers: [SweetAlertService, AdminPresentacionesService]
})
export class AdminPresentacionesModule { }
