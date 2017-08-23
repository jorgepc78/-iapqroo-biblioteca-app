import { NgModule                        } from '@angular/core';
import { CommonModule                    } from '@angular/common';
import { FormsModule                     } from '@angular/forms';

import { NgxPaginationModule             } from 'ngx-pagination';
import { PerfectScrollbarModule          } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { ModalModule                     } from 'angular2-modal';
import { BootstrapModalModule            } from 'angular2-modal/plugins/bootstrap';
//import { VexModalModule                } from 'angular2-modal/plugins/vex';

import { ConsultaRevistasRoutingModule   } from './consulta-revistas-routing.module';
import { ConsultaRevistasComponent       } from './consulta-revistas.component';
import { ConsultaRevistasService         } from './consulta-revistas.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, FormsModule, ConsultaRevistasRoutingModule, NgxPaginationModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG), ModalModule.forRoot(), BootstrapModalModule],
  declarations: [ConsultaRevistasComponent],
  providers: [ConsultaRevistasService]
})
export class ConsultaRevistasModule { }
