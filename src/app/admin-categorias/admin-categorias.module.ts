import { NgModule                        } from '@angular/core';
import { CommonModule                    } from '@angular/common';

import { TreeModule } from 'angular-tree-component';

import { SweetAlertService               } from 'ngx-sweetalert2';

import { AdminCategoriasComponent            } from './admin-categorias.component';
import { AdminCategoriasService              } from './admin-categorias.service';

import { AdminCategoriasRoutingModule } from './admin-categorias-routing.module';
import { TreeAdminCategoriasComponent } from './tree-admin-categorias/tree-admin-categorias.component';

@NgModule({
  imports: [CommonModule, AdminCategoriasRoutingModule, TreeModule],
  declarations: [AdminCategoriasComponent, TreeAdminCategoriasComponent],
  providers: [SweetAlertService, AdminCategoriasService]
})
export class AdminCategoriasModule { }
