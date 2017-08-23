import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router                              } from '@angular/router';
import { Overlay, overlayConfigFactory       } from 'angular2-modal';
import { Modal, BSModalContext               } from 'angular2-modal/plugins/bootstrap';
import { DomSanitizer, SafeHtml              } from '@angular/platform-browser';
import { SecurityContext                     } from '@angular/core';

import { environment                         } from '../../../environments/environment';
import { ConsultaPublicacionesService        } from './consulta-publicaciones.service';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-consulta-publicaciones',
  templateUrl: './consulta-publicaciones.component.html',
  styleUrls: ['./consulta-publicaciones.component.css']
})
export class ConsultaPublicacionesComponent implements OnInit {

  public listaCategorias: any = [];
  public categoriaActiva: number = 0;
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

  constructor(
    private route: Router,
    public modal: Modal,
    private sanitizer: DomSanitizer,
    private consultaPublicacionesService: ConsultaPublicacionesService
  ) { }

  ngOnInit() {

    this.consultaPublicacionesService
      .getCategPublicaciones()
      .subscribe(
      data => {

        data.json().map(record => {
          this.listaCategorias.push({
            idCategoria: record.idCategoria,
            descripcion: record.descripcion,
            total: record.total,
            icono: record.idCategoria == 0 ? 'layers' : 'book-open'
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

    this.consultaPublicacionesService
      .getTotalPublicaciones(this.tablaListaRegistros.condicion)
      .subscribe(
      data => {
        this.tablaListaRegistros.totalElementos = data.json().count;
        this.totalRegistrosGlobal = data.json().count;
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


  recargaPlugin() {
    if (this.cubeportfolio !== undefined)
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
          { width: 1500, cols: 5 },
          { width: 1100, cols: 3 },
          { width: 800, cols: 3 },
          { width: 480, cols: 1 },
          { width: 320, cols: 1 }
        ],
        caption: 'overlayBottomAlong',
        displayType: 'sequentially',
        displayTypeSpeed: 80,
      });
    }, 300);
  }


  filtraCategoria(id: number) {
    if (id == -1)
      return;

    if (this.mostrarResBusqueda == true) {
      this.listaCategorias.splice(-1, 1);
      this.mostrarResBusqueda = false;
      this.textoBuscar = '';
    }

    if (id == 0) {
      this.tablaListaRegistros.condicion = {};
      this.tablaListaRegistros.totalElementos = this.totalRegistrosGlobal;
    }
    else {
      this.tablaListaRegistros.condicion = { idCategoria: id };
    }

    this.categoriaActiva = id;

    this.tablaListaRegistros.paginaActual = 1;
    this.consultaPublicacionesService
      .getTotalPublicaciones(this.tablaListaRegistros.condicion)
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
    this.consultaPublicacionesService
      .getTotalPublicaciones(this.tablaListaRegistros.condicion)
      .subscribe(
      data => {
        this.tablaListaRegistros.totalElementos = data.json().count;
        this.cambiaPagina(this.tablaListaRegistros.paginaActual);

        this.listaCategorias.push({
          idCategoria: -1,
          descripcion: 'Resultado búsqueda',
          total: this.tablaListaRegistros.totalElementos,
          icono: 'magnifier'
        });
        this.categoriaActiva = -1;

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
    this.consultaPublicacionesService
      .getListaPublicaciones(this.tablaListaRegistros.condicion, this.tablaListaRegistros.registrosPorPagina, this.tablaListaRegistros.paginaActual)
      .subscribe(
      data => {
        let datos = data.json();
        this.listaRegistros = [];
        datos.map(record => {
          this.listaRegistros.push({
            idPublicacion: record.idPublicacion,
            portada: (record.portada == '' ? 'assets/img/portada_no_disponible.jpg' : record.portada),
            nombre: record.nombre,
            autor: record.autor,
            descripcion: record.descripcion,
            idCategoria: record.idCategoria,
            categoria: (record.categoria_pertenece == undefined ? 'Sin categoría' : record.categoria_pertenece.descripcion)
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


  previewDocumento(publicacion) {
    let codigo = `
              <div class="row">
                <div class="col-md-12">
                  <h4>Autor: ${publicacion.autor}</h4>
                </div>
              </div>

              <div class="row">
                  <div class="col-md-8">
                      <h4>Extracto:</h4>
                      <div class="text-justify">
                          <div>${publicacion.descripcion}</div>
                      </div>
                  </div>
                  <div class="col-md-4">
                          <img src="${publicacion.portada}" alt="" height="350">
                  </div>
              </div>
              `;

    const dialogRef = this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(false)
      .keyboard(27)
      .title(publicacion.nombre)
      .okBtn('Ver publicación')
      .okBtnClass('btn btn-circle btn-success')
      .cancelBtn('Cerrar')
      .cancelBtnClass('btn btn-circle btn-default')
      .body(codigo)
      .open();

    dialogRef
      .then(result => {
        result.result.then(() => {
          this.abrirDocumento(publicacion.idPublicacion);
        },
          () => { });
      });
  }

  abrirDocumento(idPublicacion) {
    this.route.navigate(['principal/documento/publicacion', idPublicacion]);
  }

}
