import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '../../environments/environment';
import { VisorDocumentosService } from './visor-documentos.service';

@Component({
  selector: 'app-visor-documentos',
  templateUrl: './visor-documentos.component.html',
  styleUrls: ['./visor-documentos.component.css']
})
export class VisorDocumentosComponent implements OnInit {

  public pdfSrc: any;
  public habilitarBtn: boolean = false;
  public pagina: number = 1;
  public numPaginas: number = 2;
  public zoom: number = 1;

  public pdfFile: any = '';

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private visorDocumentosService: VisorDocumentosService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    let documento : string = '';
    let url = this.route.snapshot.url[0].toString();
    if(url == 'libro')
      documento = 'Libros';

    let token = JSON.parse(localStorage.getItem('token'));

    this.pdfFile = this.sanitizer.bypassSecurityTrustResourceUrl(environment.apiUrl + "almacen_archivos/libros/download/(CARTA DE CADIZ.pdf?access_token=" + token.id + '#view=FitH&scrollbar=1&toolbar=1&navpanes=1');




    this.visorDocumentosService
      .getNombrePDF2(documento, this.route.snapshot.params['id'])
      .then(data => { 
        //console.log(data);
        var downloadUrl = URL.createObjectURL(data);
        //window.open(downloadUrl);
        this.pdfSrc = { url: downloadUrl };
      })
      .catch(error => console.log(error));


    /*this.visorDocumentosService
      .getNombrePDF2(documento, this.route.snapshot.params['id'])
      .subscribe(
      data => {
        console.log(data);
        //var downloadUrl = URL.createObjectURL(data);
        //window.open(downloadUrl);




                //let nombreArchivo = data.json().nombreArchivo;
        this.pdfSrc = {
          //url: environment.apiUrl + "almacen_archivos/libros/download/" + nombreArchivo + "?access_token=" + token.id,
          //withCredentials: true,
          //httpHeaders: { 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Headers': 'Range'}
          data: data
          
        };
        console.log(this.pdfSrc);
      },
      err => {
        if (err.json().error == undefined)
          console.log("Error de conexion");
        else {
          let error = err.json().error;
          if (error.status == 401)
            console.log("error de autorizacion");
        }
      });*/

  }

  pdfURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.pdfFile);
  }


  pagSiguiente() {
    if(this.pagina < this.numPaginas)
    this.pagina++;
  }

  pagPrevia() {
    if(this.pagina > 1)
    this.pagina--;
  }

  zoomIn() {
    if (this.zoom < 4.1)
      this.zoom += 0.1;
    console.log(this.zoom);
  }

  zoomOut() {
    if (this.zoom > 0.7)
      this.zoom -= 0.1;
    console.log(this.zoom);
  }

  zoom100() {
    this.zoom = 1;
  }

  documentoCargado(event) {
    this.numPaginas = event.numPages;
  }

  onError(error: any) {
    console.log(error);
  }

}
