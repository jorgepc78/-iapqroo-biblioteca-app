import { Component, OnInit      } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer           } from '@angular/platform-browser'
import { SweetAlertService      } from 'ngx-sweetalert2';
import { environment            } from '../../../environments/environment';
import { AdminDocumentosService } from './admin-documentos.service';


@Component({
  selector: 'app-admin-documentos',
  templateUrl: './admin-documentos.component.html',
  styleUrls: ['./admin-documentos.component.css']
})
export class AdminDocumentosComponent implements OnInit {

  public tipoDocumento: string = "";
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
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private _swal2: SweetAlertService,
    private adminDocumentosService: AdminDocumentosService
  ) { }

  ngOnInit() {
    
    if(this.route.snapshot.paramMap.get('tipo') === 'documentos')
      this.tipoDocumento = 'Documentos';
    else
      this.tipoDocumento = 'Videos';

    this.adminDocumentosService
      .getTotalDocumentos(this.tablaListaRegistros.condicion, this.tipoDocumento)
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
    this.adminDocumentosService
      .getListaDocumentosAdmin(this.tablaListaRegistros.condicion, this.tablaListaRegistros.registrosPorPagina, this.tablaListaRegistros.paginaActual, this.tipoDocumento)
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
          idDocumento: registro.idDocumento,
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
    this.adminDocumentosService
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

  limpiaTexto() {
    this.textoBuscar = '';
    this.tablaListaRegistros.condicion = {};
    this.showBtnLimpiar = false;
    this.tablaListaRegistros.paginaActual = 1;
    this.tablaListaRegistros.totalElementos = this.totalRegistrosGlobal;
    this.cambiaPagina(this.tablaListaRegistros.paginaActual);
  }


  nuevoRegistro() {
    this.router.navigate(['principal/documento/agregadocumento'])
  }


  editaRegistro(id) {
    this.router.navigate(['principal/documento/editadocumento', id])
  }


  eliminaRegistro(id, nombreArchivo) {

    this._swal2.confirm({
      title: '¿Eliminar registro?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
    .then(() => {

      this.adminDocumentosService
        .eliminaDocumento(id, nombreArchivo, this.tipoDocumento)
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

  verLibro(nombreArchivo: string) {
    let token = JSON.parse(localStorage.getItem('token'));
    window.open(environment.apiUrl + "almacen_archivos/documentos/download/" + nombreArchivo + "?access_token=" + token.id, "_blank");
  }


}
