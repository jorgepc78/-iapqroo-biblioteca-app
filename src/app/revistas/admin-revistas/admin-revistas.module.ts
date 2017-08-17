import { NgModule                        } from '@angular/core';
import { CommonModule                    } from '@angular/common';
import { FormsModule                     } from '@angular/forms';

import { SweetAlertService               } from 'ngx-sweetalert2';
import { NgxPaginationModule             } from 'ngx-pagination';
import { PerfectScrollbarModule          } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AdminRevistasRoutingModule        } from './admin-revistas-routing.module';
import { AdminRevistasComponent            } from './admin-revistas.component';
import { AdminRevistasService } from './admin-revistas.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [CommonModule, FormsModule, NgxPaginationModule, AdminRevistasRoutingModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)],
  declarations: [AdminRevistasComponent],
  providers: [SweetAlertService, AdminRevistasService]
})
export class AdminRevistasModule { }
