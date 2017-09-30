import { Component, OnInit } from '@angular/core';
import { SweetAlertService  } from 'ngx-sweetalert2';
import { ActivatedRoute                            } from '@angular/router';

import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

import { AdminCategoriasService } from './admin-categorias.service';

@Component({
  selector: 'app-admin-categorias',
  templateUrl: './admin-categorias.component.html',
  styleUrls: ['./admin-categorias.component.css']
})
export class AdminCategoriasComponent implements OnInit {

  public listaRegistros: any = [];
  public tipoDocumento: any;
  public estructuratree: any;
  public nombreDocumento: string = "";

  public treeOptions: ITreeOptions = {
      displayField: 'descripcion',
      //isExpandedField: 'expanded',
      idField: 'idCategoria',
      //nodeHeight: 53,
      allowDrag: false,
      allowDrop: false,
      useVirtualScroll: true,
      animateExpand: true,
      animateSpeed: 30,
      animateAcceleration: 1.2
  };

  constructor(
    private _swal2: SweetAlertService,
    private route: ActivatedRoute,
    private adminCategoriasService: AdminCategoriasService

  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
       let tipo = params['tipo']; 

        if(params['tipo'] === 'documentos') {
          this.tipoDocumento = 'CategoriasDocumentos';
          this.nombreDocumento = 'Documentos';
        }
        else {
          this.tipoDocumento = 'CategoriasVideos';
          this.nombreDocumento = 'Videos';
        }

        this.adminCategoriasService
          .getlistaCategorias(this.tipoDocumento)
          .subscribe(
          data => {
              this.listaRegistros = data.json();

              this.listaRegistros.unshift({
                  idCategoria: 0,
                  idPadre: -1,
                  descripcion: 'Categorías'
              });

              /*this.listaRegistros = this._queryTreeSort({
                q: datos
              });*/

              this.estructuratree = this._makeTree({
                  q: this._queryTreeSort({
                      q: this.listaRegistros
                  })
              });


              /*this.estructuratree = this._makeTree({
                q: this.listaRegistros
              });*/
              //console.log(this.estructuratree);
          },
          err => {
            if (err.json().error == undefined)
              console.log("Error de conexion");
            else {
              let error = err.json().error;
              if (error.status == 401)
                console.log("error de autorizacion");
            }
          });

    });

  }


  onInitialized(tree) {
    tree.treeModel.getNodeById(0).setActiveAndVisible();

  }


  editaRegistro($event, nodo) {

    $event.stopPropagation();

    this._swal2.prompt({
      title: 'Edita categoría',
      inputValue: nodo.descripcion,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    })
    .then((resp) => {

      this.adminCategoriasService
        .actualizaRegistro(nodo.idCategoria, resp, this.tipoDocumento)
        .subscribe(
        data => {
          nodo.descripcion = data.json().descripcion;
        },
        err => {
          if (err.json().error == undefined)
            console.log("Error de conexion");
          else {
            let error = err.json().error;
            if (error.status == 401)
              console.log("error de autorizacion");
          }
        });

    })
    .catch(() => {});
  }


  nuevoRegistro(tree, nodo) {

    this._swal2.prompt({
      title: 'Nueva categoría',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    })
    .then((resp) => {

      this.adminCategoriasService
        .nuevoRegistro(resp, nodo.idCategoria, this.tipoDocumento)
        .subscribe(
        data => {

            this.adminCategoriasService
              .getlistaCategorias(this.tipoDocumento)
              .subscribe(
              data => {
                  let datos = data.json();
                  datos.unshift({
                      idCategoria: 0,
                      idPadre: -1,
                      descripcion: 'Categorías'
                  });

                  this.estructuratree = this._makeTree({
                      q: this._queryTreeSort({
                          q: datos
                      })
                  });
                  tree.treeModel.update();
              });
        },
        err => {
          if (err.json().error == undefined)
            console.log("Error de conexion");
          else {
            let error = err.json().error;
            if (error.status == 401)
              console.log("error de autorizacion");
          }
        });

    })
    .catch(() => {});
  }


  eliminaRegistro(tree, nodo) {

      this.adminCategoriasService
        .getElementosCategoria(nodo.idCategoria, this.tipoDocumento)
        .subscribe(
        data => {
          let elementosContiene = data.json().count;
          if(elementosContiene == 0)
          {

              this._swal2.confirm({
                title: '¿Eliminar la categoría ' + nodo.descripcion + '?',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
              })
              .then(() => {

                  this.adminCategoriasService
                    .eliminaRegistro(nodo.idCategoria, this.tipoDocumento)
                    .subscribe(
                    data => {

                    this.adminCategoriasService
                      .getlistaCategorias(this.tipoDocumento)
                      .subscribe(
                      data => {
                          let datos = data.json();
                          datos.unshift({
                              idCategoria: 0,
                              idPadre: -1,
                              descripcion: 'Categorías'
                          });

                          this.estructuratree = this._makeTree({
                              q: this._queryTreeSort({
                                  q: datos
                              })
                          });
                          tree.treeModel.update();
                          this._swal2.success({
                            title: 'Registro eliminado'
                          });
                      });

                    },
                    err => {
                      if (err.json().error == undefined)
                        console.log("Error de conexion");
                      else {
                        let error = err.json().error;
                        if (error.status == 401)
                          console.log("error de autorizacion");
                      }
                    });

              });
          }
          else
          {
                this._swal2.error({
                  text: 'No se puede eliminar la categoría porque ya esta asignada a algún elemento'
                });
          }
        },
        err => {
          if (err.json().error == undefined)
            console.log("Error de conexion");
          else {
            let error = err.json().error;
            if (error.status == 401)
              console.log("error de autorizacion");
          }
        });
  }


  _makeTree(options) {
    var children, e, id, o, pid, temp, _i, _len, _ref;
    id = options.id || "idCategoria";
    pid = options.parentid || "idPadre";
    children = options.children || "children";
    temp = {};
    o = [];
    _ref = options.q;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      e.isExpanded = true;
      e[children] = [];
      temp[e[id]] = e;
      if (temp[e[pid]] != null) {
        temp[e[pid]][children].push(e);
      } else {
        o.push(e);
      }
    }
    return o;
  };  


  _queryTreeSort(options) {
    var cfi, e, i, id, o, pid, rfi, ri, thisid, _i, _j, _len, _len1, _ref, _ref1;
    id = options.id || "idCategoria";
    pid = options.parentid || "idPadre";
    ri = [];
    rfi = {};
    cfi = {};
    o = [];
    _ref = options.q;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      e = _ref[i];
      rfi[e[id]] = i;
      if (cfi[e[pid]] == null) {
        cfi[e[pid]] = [];
      }
      cfi[e[pid]].push(options.q[i][id]);
    }
    _ref1 = options.q;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      e = _ref1[_j];
      if (rfi[e[pid]] == null) {
        ri.push(e[id]);
      }
    }
    while (ri.length) {
      thisid = ri.splice(0, 1);
      o.push(options.q[rfi[thisid]]);
      if (cfi[thisid] != null) {
        ri = cfi[thisid].concat(ri);
      }
    }
    return o;
  };

}
