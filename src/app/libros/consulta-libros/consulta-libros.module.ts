import { NgModule                        } from '@angular/core';
import { CommonModule                    } from '@angular/common';

import { NgxPaginationModule             } from 'ngx-pagination';
import { PerfectScrollbarModule          } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { ModalModule } from 'angular2-modal';
//import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { VexModalModule } from 'angular2-modal/plugins/vex';

import { ConsultaLibrosRoutingModule     } from './consulta-libros-routing.module';
import { ListaTemasModule                } from '../../shared/lista-temas/lista-temas.module';
import { ConsultaLibrosComponent         } from './consulta-libros.component';
import { ConsultaLibrosService           } from './consulta-libros.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, ListaTemasModule, ConsultaLibrosRoutingModule, NgxPaginationModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG), ModalModule.forRoot(), VexModalModule],
    declarations: [ConsultaLibrosComponent],
    providers: [ConsultaLibrosService]
})
export class ConsultaLibrosModule { }
