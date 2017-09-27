import { Component, OnInit             } from '@angular/core';
import { Location                      } from '@angular/common';
import { ActivatedRoute                } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { environment                   } from '../../../environments/environment';
import { VisorDocumentosService        } from './visor-documentos.service';

@Component({
  selector: 'app-visor-documentos',
  templateUrl: './visor-documentos.component.html',
  styleUrls: ['./visor-documentos.component.css']
})
export class VisorDocumentosComponent implements OnInit {

  public pdfFile: SafeResourceUrl;
  public titulo: string = '';
  public msgError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private visorDocumentosService: VisorDocumentosService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    let documento, contenedor : string = '';
    let url = this.route.snapshot.url[0].toString();
    if(url == 'libro') {
      documento = 'Libros';
      contenedor = 'libros';
    }
    else if(url == 'revista') {
      documento = 'Revistas';
      contenedor = 'revistas';
    }
    else if(url == 'publicacion') {
      documento = 'Publicaciones';
      contenedor = 'publicaciones';
    }
    else if(url == 'presentacion') {
      documento = 'Presentaciones';
      contenedor = 'presentaciones';
    }

    let token = JSON.parse(localStorage.getItem('token'));

    this.visorDocumentosService
      .getNombrePDF(documento, this.route.snapshot.params['id'])
      .subscribe(
      data => {
        let nombreArchivo = data.json().nombreArchivo;
        this.titulo = data.json().nombre;

        let numVistas = 1;
        let idVista = 0;
        if(data.json().visitas.length > 0 ) {
          numVistas = data.json().visitas[0].numVistas + 1;
          idVista = data.json().visitas[0].id;
        }

        this.visorDocumentosService
          .getPDF(nombreArchivo, contenedor, this.route.snapshot.params['id'])
          .then(data => {
            //console.log(data);
            var downloadUrl = URL.createObjectURL(data);
            this.pdfFile = this.sanitizer.bypassSecurityTrustResourceUrl(downloadUrl + '#view=FitH&zoom=100&scrollbar=1&toolbar=1&navpanes=1');

            this.visorDocumentosService
                  .addCountVista(documento, idVista, this.route.snapshot.params['id'], numVistas)
                  .subscribe(
                  data => {
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
          .catch(error => {
            this.msgError = true;
          });

        //this.pdfFile = this.sanitizer.bypassSecurityTrustResourceUrl(environment.apiUrl + "almacen_archivos/" + contenedor + "/download/" + nombreArchivo + "?access_token=" + token.id + '#view=FitH&zoom=100&scrollbar=1&toolbar=1&navpanes=1');
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


  regresar() {
    this._location.back();
  }

}
