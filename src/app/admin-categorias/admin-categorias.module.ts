import { NgModule                        } from '@angular/core';
import { CommonModule                    } from '@angular/common';

import { TreeModule } from 'angular-tree-component';

import { SweetAlertService               } from 'ngx-sweetalert2';

import { AdminCategoriasComponent            } from './admin-categorias.component';
import { AdminCategoriasService              } from './admin-categorias.service';

import { AdminCategoriasRoutingModule } from './admin-categorias-routing.module';


@NgModule({
  imports: [CommonModule, AdminCategoriasRoutingModule, TreeModule],
  declarations: [AdminCategoriasComponent],
  providers: [SweetAlertService, AdminCategoriasService]
})
export class AdminCategoriasModule { }
