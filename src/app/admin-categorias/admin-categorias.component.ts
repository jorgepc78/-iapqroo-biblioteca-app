import { Component, OnInit } from '@angular/core';
import { SweetAlertService  } from 'ngx-sweetalert2';
import { ActivatedRoute                            } from '@angular/router';
import { AdminCategoriasService } from './admin-categorias.service';

@Component({
  selector: 'app-admin-categorias',
  templateUrl: './admin-categorias.component.html',
  styleUrls: ['./admin-categorias.component.css']
})
export class AdminCategoriasComponent implements OnInit {

  public listaRegistros: any = [];
  public tipo: any;
  private sub: any;

  public tablaListaRegistros = {
    totalElementos     : 0,
    paginaActual       : 1,
    registrosPorPagina : 10,
    condicion          : {}
  };

  constructor(
    private _swal2: SweetAlertService,
    private route: ActivatedRoute,
    private adminCategoriasService: AdminCategoriasService
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
       this.tipo = params['tipo']; 

      this.adminCategoriasService
        .getlistaCategorias(this.tipo)
        .subscribe(
        data => {
            this.tablaListaRegistros.totalElementos = data.json().length;
            this.listaRegistros = data.json();
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


  nuevoRegistro() {

    this._swal2.prompt({
      title: 'Nueva categoría',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    })
    .then((resp) => {

      this.adminCategoriasService
        .nuevoRegistro(resp, this.tipo)
        .subscribe(
        data => {
            this.adminCategoriasService
              .getlistaCategorias(this.tipo)
              .subscribe(
              data => {
                  this.tablaListaRegistros.totalElementos = data.json().length;
                  this.listaRegistros = data.json();
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


  editaRegistro(registro) {
    this._swal2.prompt({
      title: 'Edita categoría',
      inputValue: registro.descripcion,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    })
    .then((resp) => {

      this.adminCategoriasService
        .actualizaRegistro(registro.idCategoria, resp, this.tipo)
        .subscribe(
        data => {
          registro.descripcion = data.json().descripcion;
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


  eliminaRegistro(registro) {

      this.adminCategoriasService
        .getElementosCategoria(registro.idCategoria, this.tipo)
        .subscribe(
        data => {
          let elementosContiene = data.json().count;
          if(elementosContiene == 0)
          {

              this._swal2.confirm({
                title: '¿Eliminar registro?',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
              })
              .then(() => {

                  this.adminCategoriasService
                    .eliminaRegistro(registro.idCategoria, this.tipo)
                    .subscribe(
                    data => {
                      this.listaRegistros.splice(this.listaRegistros.findIndex(x => x.idCategoria === registro.idCategoria), 1);
                      this.tablaListaRegistros.totalElementos --;

                      this._swal2.success({
                        title: 'Registro eliminado'
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


}
