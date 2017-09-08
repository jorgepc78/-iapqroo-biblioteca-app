import { Component, OnInit    } from '@angular/core';
import { Router               } from '@angular/router';
import { DomSanitizer         } from '@angular/platform-browser'
import { SweetAlertService    } from 'ngx-sweetalert2';
import { environment          } from '../../../environments/environment';
import { AdminRevistasService } from './admin-revistas.service';


@Component({
  selector: 'app-admin-revistas',
  templateUrl: './admin-revistas.component.html',
  styleUrls: ['./admin-revistas.component.css']
})
export class AdminRevistasComponent implements OnInit {

  public listaRegistros: any = [];
  public registroSeleccionado: any;
  public showBtnLimpiar: boolean = false;
  public textoBuscar: string = '';
  public totalRegistrosGlobal: number = 0;

  public tablaListaRegistros = {
    totalElementos     : 0,
    paginaActual       : 1,
    registrosPorPagina : 10,
    condicion          : {}
  };

  constructor(
    private route: Router,
    private sanitizer: DomSanitizer,
    private _swal2: SweetAlertService,
    private adminRevistasService: AdminRevistasService
  ) { }

  ngOnInit() {
    this.adminRevistasService
      .getTotalRevistas(this.tablaListaRegistros.condicion)
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


  cambiaPagina(page: number) {
    this.tablaListaRegistros.paginaActual = page;
    this.adminRevistasService
      .getlistaRevistasAdmin(this.tablaListaRegistros.condicion, this.tablaListaRegistros.registrosPorPagina, this.tablaListaRegistros.paginaActual)
      .subscribe(
      data => {
        this.listaRegistros = data.json();
        this.muestraDatosRegistro(this.listaRegistros[0]);
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


  muestraDatosRegistro(registro) {
    if(registro !== undefined)
    {
        this.registroSeleccionado = {
          idRevista: registro.idRevista,
          nombre: registro.nombre,
          autor: registro.autor,
          descripcion: this.sanitizer.bypassSecurityTrustHtml(registro.descripcion),
          idCategoria: registro.idCategoria,
          nombreArchivo: registro.nombreArchivo,
          portada: registro.portada,
          categoria_pertenece: registro.categoria_pertenece === undefined ? {} : registro.categoria_pertenece
        };
    }
  }


  buscaTexto() {
    this.tablaListaRegistros.condicion = {nombre:{like:"%25"+this.textoBuscar+"%25"}};
    this.showBtnLimpiar = true;
    this.tablaListaRegistros.paginaActual = 1;
    this.adminRevistasService
      .getTotalRevistas(this.tablaListaRegistros.condicion)
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

  limpiaTexto() {
    this.textoBuscar = '';
    this.tablaListaRegistros.condicion = {};
    this.showBtnLimpiar = false;
    this.tablaListaRegistros.paginaActual = 1;
    this.tablaListaRegistros.totalElementos = this.totalRegistrosGlobal;
    this.cambiaPagina(this.tablaListaRegistros.paginaActual);
  }


  nuevoRegistro() {
    this.route.navigate(['principal/detallerevista/agregarevista'])
  }


  editaRegistro(id) {
    this.route.navigate(['principal/detallerevista/editarevista', id])
  }


  eliminaRegistro(id, nombreArchivo) {

    this._swal2.confirm({
      title: '¿Eliminar registro?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
    .then(() => {

      this.adminRevistasService
        .eliminaRevista(id, nombreArchivo)
        .subscribe(
        data => {
          this.totalRegistrosGlobal--;
          this.limpiaTexto();
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
            else if (error.statusCode == 500 && error.statusCode !== undefined) {
              this.totalRegistrosGlobal--;
              this.limpiaTexto();
              this._swal2.success({
                title: 'Registro eliminado'
              });
            }
          }
        });

    });
  }

  verRevista(nombreArchivo: string) {
    let token = JSON.parse(localStorage.getItem('token'));
    window.open(environment.apiUrl + "almacen_archivos/revistas/download/" + nombreArchivo + "?access_token=" + token.id, "_blank");
  }


}
