import { NgModule                        } from '@angular/core';
import { CommonModule                    } from '@angular/common';
import { FormsModule                     } from '@angular/forms';

import { NgxPaginationModule             } from 'ngx-pagination';
import { PerfectScrollbarModule          } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { ConsultaLibrosRoutingModule     } from './consulta-libros-routing.module';
import { ConsultaLibrosComponent         } from './consulta-libros.component';
import { ConsultaLibrosService           } from './consulta-libros.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [CommonModule, FormsModule, ConsultaLibrosRoutingModule, NgxPaginationModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG), ModalModule.forRoot(), BootstrapModalModule],
    declarations: [ConsultaLibrosComponent],
    providers: [ConsultaLibrosService]
})
export class ConsultaLibrosModule { }
