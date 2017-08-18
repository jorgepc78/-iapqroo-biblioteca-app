import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
//import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import {
  DialogFormModal,
  DropInPresetBuilder,
  Modal
} from 'angular2-modal/plugins/vex';

import { environment           } from '../../../environments/environment';
import { ConsultaLibrosService } from './consulta-libros.service';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-consulta-libros',
  templateUrl: './consulta-libros.component.html',
  styleUrls: ['./consulta-libros.component.css']
})
export class ConsultaLibrosComponent implements OnInit {

  public listaCategorias: any = [];
  public categoriaActiva: number = 0;
  public listaRegistros: any = [];
  public totalRegistrosGlobal: number = 0;
  public cubeportfolio: any;

  public tablaListaRegistros = {
    totalElementos: 0,
    paginaActual: 1,
    registrosPorPagina: 20,
    condicion: {}
  };

  constructor(
    public modal: Modal,
    private consultaLibrosService: ConsultaLibrosService
  ) { }

  ngOnInit() {

    this.consultaLibrosService
      .getCategLibros()
      .subscribe(
      data => {
        this.listaCategorias = data.json();
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

    this.consultaLibrosService
      .getTotalLibros(this.tablaListaRegistros.condicion)
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
            {width: 1100, cols: 3}, 
            {width: 800, cols: 3},
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
    if(id == 0) {
      this.tablaListaRegistros.condicion = {};
      this.tablaListaRegistros.totalElementos = this.totalRegistrosGlobal;
    }
    else {
      this.tablaListaRegistros.condicion = { idCategoria: id };
    }

    this.categoriaActiva = id;

    this.tablaListaRegistros.paginaActual = 1;
    this.consultaLibrosService
      .getTotalLibros(this.tablaListaRegistros.condicion)
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


  cambiaPagina(page: number) {
    this.tablaListaRegistros.paginaActual = page;
    this.consultaLibrosService
      .getListaLibros(this.tablaListaRegistros.condicion, this.tablaListaRegistros.registrosPorPagina, this.tablaListaRegistros.paginaActual)
      .subscribe(
      data => {
        let datos = data.json();
        this.listaRegistros = [];
        datos.map(record => {
          this.listaRegistros.push({
            idLibro: record.idLibro,
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

  previewDocumento(libro) {

    this.modal.alert()
      .className('default')
      .message(`
              <div class="row">
                <div class="col-md-12">
                  <h4>Autor: ${libro.autor}</h4>
                </div>
              </div>

              <div class="row">
                  <div class="col-md-8">
                      <h4>Extracto:</h4>
                      <div class="text-justify">
                          <span>${libro.descripcion}</span>
                      </div>
                  </div>
                  <div class="col-md-4">

                      <div class="row">
                        <div class="col-md-12">
                          <img src="${libro.portada}" alt="" height="350">
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                            <button type="button" (click)="regresar()" class="btn btn-circle grey-salsa btn-outline">Cancelar</button>
                        </div>
                      </div>

                  </div>
              </div>
              `)
      .showCloseButton(true)
      .open();
      /*const dialogRef = this.modal.alert()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .title(libro.nombre)
        .okBtn('Cerrar')
        .okBtnClass('btn btn-circle btn-success')
        .body(`
              <div class="row">
                <div class="col-md-12">
                  <h4>Autor: ${libro.autor}</h4>
                </div>
              </div>

              <div class="row">
                  <div class="col-md-8">
                      <h4>Extracto:</h4>
                      <div class="text-justify">
                          <span>${libro.descripcion}</span>
                      </div>
                  </div>
                  <div class="col-md-4">

                      <div class="row">
                        <div class="col-md-12">
                          <img src="${libro.portada}" alt="" height="350">
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                            <button type="button" (click)="regresar()" class="btn btn-circle grey-salsa btn-outline">Cancelar</button>
                        </div>
                      </div>

                  </div>
              </div>
              `)
        .open();*/

        /*dialogRef
          .then(dialogRef => {
            dialogRef.result.then(result => alert(`The result is: ${result}`));
          });*/
  }

}
