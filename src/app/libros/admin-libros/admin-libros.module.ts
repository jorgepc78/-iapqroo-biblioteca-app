import { NgModule                        } from '@angular/core';
import { CommonModule                    } from '@angular/common';
import { FormsModule                     } from '@angular/forms';

import { SweetAlertService               } from 'ngx-sweetalert2';
import { NgxPaginationModule             } from 'ngx-pagination';
import { PerfectScrollbarModule          } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AdminLibrosRoutingModule        } from './admin-libros-routing.module';
import { AdminLibrosComponent            } from './admin-libros.component';
import { AdminLibrosService              } from './admin-libros.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [CommonModule, FormsModule, NgxPaginationModule, AdminLibrosRoutingModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)],
  declarations: [AdminLibrosComponent],
  providers: [SweetAlertService, AdminLibrosService]
})
export class AdminLibrosModule { }
