import { NgModule                           } from '@angular/core';
import { CommonModule                       } from '@angular/common';
import { FormsModule                        } from '@angular/forms';

import { NgxPaginationModule                } from 'ngx-pagination';
import { PerfectScrollbarModule             } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface    } from 'ngx-perfect-scrollbar';

import { ModalModule                        } from 'angular2-modal';
import { BootstrapModalModule               } from 'angular2-modal/plugins/bootstrap';

import { ConsultaPublicacionesRoutingModule } from './consulta-publicaciones-routing.module';
import { ConsultaPublicacionesComponent     } from './consulta-publicaciones.component';
import { ConsultaPublicacionesService       } from './consulta-publicaciones.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, FormsModule, ConsultaPublicacionesRoutingModule, NgxPaginationModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG), ModalModule.forRoot(), BootstrapModalModule],
  declarations: [ConsultaPublicacionesComponent],
  providers: [ConsultaPublicacionesService]
})
export class ConsultaPublicacionesModule { }
