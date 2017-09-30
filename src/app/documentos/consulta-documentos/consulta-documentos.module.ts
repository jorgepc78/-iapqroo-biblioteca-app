import { NgModule                        } from '@angular/core';
import { CommonModule                    } from '@angular/common';
import { FormsModule                     } from '@angular/forms';

import { TreeModule                      } from 'angular-tree-component';

import { NgxPaginationModule             } from 'ngx-pagination';
import { PerfectScrollbarModule          } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { ModalModule                     } from 'angular2-modal';
import { BootstrapModalModule            } from 'angular2-modal/plugins/bootstrap';

import { ConsultaDocumentosRoutingModule } from './consulta-documentos-routing.module';

import { ConsultaDocumentosComponent     } from './consulta-documentos.component';
import { ConsultaDocumentosService       } from './consulta-documentos.service';
import { MessageService                  } from './message.service';

import { TreeCategoriasComponent         } from '../tree-categorias/tree-categorias.component';




const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [CommonModule, FormsModule, ConsultaDocumentosRoutingModule, TreeModule, NgxPaginationModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG), ModalModule.forRoot(), BootstrapModalModule],
    declarations: [ConsultaDocumentosComponent, TreeCategoriasComponent],
    providers: [ConsultaDocumentosService, MessageService]
})

export class ConsultaDocumentosModule { }
