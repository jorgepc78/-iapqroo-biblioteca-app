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
  public tipoDocumento: string = "";
  public urlVideo: any = null;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private visorDocumentosService: VisorDocumentosService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.urlVideo = null;

    let url = this.route.snapshot.url[0].toString();

    if(url == 'documento')
        this.tipoDocumento = 'Documentos';
    else
        this.tipoDocumento = 'Videos';

    this.visorDocumentosService
      .getNombreUrlDocumento(this.tipoDocumento, this.route.snapshot.params['id'])
      .subscribe(
      data => {
          this.titulo = data.json().nombre;

          let numVisitas = 1;
          let idVisita = 0;
          if(data.json().visitas.length > 0 ) {
            numVisitas = data.json().visitas[0].numVisitas + 1;
            idVisita = data.json().visitas[0].id;
          }

          if(url == 'documento')
          {
              let nombreArchivo = data.json().nombreArchivo;
              this.visorDocumentosService
                .getPDF(nombreArchivo)
                .then(data => {
                  //console.log(data);
                  var downloadUrl = URL.createObjectURL(data);
                  this.pdfFile = this.sanitizer.bypassSecurityTrustResourceUrl(downloadUrl + '#view=FitH&zoom=100&scrollbar=1&toolbar=1&navpanes=1');

                  this.visorDocumentosService
                        .addCountVisita('Documentos', this.route.snapshot.params['id'], idVisita, numVisitas)
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
          }
          else
          {
                this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(data.json().url);
                this.visorDocumentosService
                      .addCountVisita('Videos', this.route.snapshot.params['id'], idVisita, numVisitas)
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


  regresar() {
    this._location.back();
  }

}
