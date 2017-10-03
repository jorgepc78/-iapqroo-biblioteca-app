import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router              } from '@angular/router';
import { Overlay, overlayConfigFactory       } from 'angular2-modal';
import { Modal, BSModalContext               } from 'angular2-modal/plugins/bootstrap';
import { DomSanitizer, SafeHtml              } from '@angular/platform-browser';
import { SecurityContext                     } from '@angular/core';

import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

import { environment                         } from '../../../environments/environment';
import { ConsultaDocumentosService           } from './consulta-documentos.service';

import { MessageService } from './message.service';
import { Subscription }   from 'rxjs/Subscription';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-consulta-documentos',
  templateUrl: './consulta-documentos.component.html',
  styleUrls: ['./consulta-documentos.component.css']
})
export class ConsultaDocumentosComponent implements OnInit, OnDestroy {

  public tipoDocumento: string = "";
  public listaCategorias: any = [];
  public listaRegistros: any = [];
  public totalRegistrosGlobal: number = 0;
  public cubeportfolio: any;
  public mostrarResBusqueda: boolean = false;
  public textoBuscar: string = '';

  public tablaListaRegistros = {
    totalElementos: 0,
    paginaActual: 1,
    registrosPorPagina: 20,
    condicion: {}
  };

  public treeOptions: ITreeOptions = {
      displayField: 'descripcion',
      idField: 'idCategoria',
      allowDrag: false,
      allowDrop: false,
      useVirtualScroll: true,
      animateExpand: true,
      animateSpeed: 30,
      animateAcceleration: 1.2
  };

  subscription: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modal: Modal,
    private sanitizer: DomSanitizer,
    private consultaDocumentosService: ConsultaDocumentosService,

    private messageService: MessageService
  ) {

    this.subscription = messageService.eventoAnunciado$.subscribe(
      idCategoria => {
        this.filtraCategoria(idCategoria);
    });    
  }

  ngOnInit() {

    this.route.params.subscribe(params => {

        this.listaCategorias = [];
        this.listaRegistros = [];
        this.tablaListaRegistros.condicion = {};
        this.textoBuscar = '';

        if(params['tipo'] === 'documentos') {
          this.tipoDocumento = 'Documentos';
        }
        else {
          this.tipoDocumento = 'Videos';
        }

        this.consultaDocumentosService
          .getTotalDocumentos(this.tablaListaRegistros.condicion, this.tipoDocumento)
          .subscribe(
          data => {
            this.tablaListaRegistros.totalElementos = data.json().count;
            this.totalRegistrosGlobal = data.json().count;
            this.cambiaPagina(this.tablaListaRegistros.paginaActual);

            this.consultaDocumentosService
              .getCategDocumentos(this.tipoDocumento)
              .subscribe(
              data => {

                this.listaCategorias = this._makeTree({
                    q: this._queryTreeSort({
                        q: data.json()
                    })
                });
                 this.listaCategorias.unshift({
                    idCategoria : 0,
                    idPadre     : 0,
                    children    : [],
                    descripcion : "Todos",
                    isExpanded  : true,
                    total       : this.tablaListaRegistros.totalElementos
                 });
                //console.log(this.listaCategorias);
                setTimeout(() => {
                  $('#menu1').metisMenu();
                  $('#menu2').metisMenu();
                },300);

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


ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }


  recargaPlugin() {
    if(this.cubeportfolio !== undefined)
      jQuery("#js-grid-juicy-projects").cubeportfolio('destroy');
    
    setTimeout(() => {
        // init cubeportfolio
        this.cubeportfolio = $('#js-grid-juicy-projects').cubeportfolio({
          filters: '#js-filters-juicy-projects',
          layoutMode: 'grid',
          defaultFilter: '*',
          animationType: 'quicksand',
          gapHorizontal: 35,
          gapVertical: 30,
          gridAdjustment: 'responsive',
          mediaQueries: [
            {width: 1500, cols: 5},
            {width: 1100, cols: 4}, 
            {width: 800, cols: 4},
            {width: 480, cols: 1},
            {width: 320, cols: 1}
          ],
          caption: 'overlayBottomAlong',
          displayType: 'sequentially',
          displayTypeSpeed: 80,
        });
    }, 300);
  }


  filtraCategoria(id:number) {
    
    if (id == -1)
      return;
    
    if (this.mostrarResBusqueda == true)
    {
      this.listaCategorias.splice(-1, 1);
      this.mostrarResBusqueda = false;
      this.textoBuscar = '';
    }

    if(id == 0) {
      this.tablaListaRegistros.condicion = {};
      this.tablaListaRegistros.totalElementos = this.totalRegistrosGlobal;
    }
    else {
      this.tablaListaRegistros.condicion = { idCategoria: id };
    }


    this.tablaListaRegistros.paginaActual = 1;
    this.consultaDocumentosService
      .getTotalDocumentos(this.tablaListaRegistros.condicion, this.tipoDocumento)
      .subscribe(
      data => {
        this.tablaListaRegistros.totalElementos = data.json().count;
        this.cambiaPagina(this.tablaListaRegistros.paginaActual);
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


  buscarDocumento() {
    this.tablaListaRegistros.condicion = { nombre: { like: "%25" + this.textoBuscar + "%25" } };
    this.tablaListaRegistros.paginaActual = 1;
    this.consultaDocumentosService
      .getTotalDocumentos(this.tablaListaRegistros.condicion, this.tipoDocumento)
      .subscribe(
      data => {
        this.tablaListaRegistros.totalElementos = data.json().count;
        this.cambiaPagina(this.tablaListaRegistros.paginaActual);

        this.mostrarResBusqueda = true;
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


  cambiaPagina(page: number) {
    this.tablaListaRegistros.paginaActual = page;
    this.consultaDocumentosService
      .getListaDocumentos(this.tablaListaRegistros.condicion, this.tablaListaRegistros.registrosPorPagina, this.tablaListaRegistros.paginaActual, this.tipoDocumento)
      .subscribe(
      data => {
        this.listaRegistros = [];
        data.json().map(record => {
          this.listaRegistros.push({
            idElemento    : this.tipoDocumento == 'Documentos' ? record.idDocumento : record.idVideo,
            nombre        : record.nombre,
            autor         : record.autor,
            descripcion   : record.descripcion,
            idCategoria   : record.idCategoria,
            rutaCategoria : record.rutaCategoria,
            nombreArchivo : record.nombreArchivo,
            portada       : (record.portada == '' ? 'assets/img/portada_no_disponible.jpg' : record.portada),
            categoria     : record.categoria_pertenece == undefined ? 'Sin categoría' : record.categoria_pertenece.descripcion,
            url           : record.url == undefined ? '' : record.url
          });
        });
        this.recargaPlugin();
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


  previewDocumento(documento) {
    let codigo = `
              <div class="row">
                <div class="col-md-12">
                  <h4>Autor: ${documento.autor}</h4>
                </div>
              </div>

              <div class="row">
                  <div class="col-md-8">
                      <h4>Extracto:</h4>
                      <div class="text-justify">
                          <div>${documento.descripcion}</div>
                      </div>
                  </div>
                  <div class="col-md-4">
                          <img src="${documento.portada}" alt="" height="350">
                  </div>
              </div>
              `;

    let textBtn: string = '';
    if(this.tipoDocumento == 'Documentos')
      textBtn = 'Ver documento';
    else
      textBtn = 'Ver video';

    const dialogRef = this.modal.confirm()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .title(documento.nombre)
        .okBtn(textBtn)
        .okBtnClass('btn btn-circle btn-success')
        .cancelBtn('Cerrar')
        .cancelBtnClass('btn btn-circle btn-default')
        .body(codigo)
        .open();

        dialogRef
          .then(result => { 
            result.result.then(() => { 
              this.abrirDocumento(documento.idElemento);
            }, 
            () => { }); 
          });
  }


  abrirDocumento(idElemento) {
    if(this.tipoDocumento == 'Documentos')
      this.router.navigate(['principal/visordocumentos/documento', idElemento]);
    else
      this.router.navigate(['principal/visordocumentos/video', idElemento]);
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
