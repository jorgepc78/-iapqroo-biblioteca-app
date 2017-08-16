import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Location                                 } from '@angular/common';
import { FormBuilder, FormGroup, Validators       } from '@angular/forms';
import { ActivatedRoute                           } from '@angular/router';

import { FileUploader                             } from 'ng2-file-upload/ng2-file-upload';
import { SweetAlertService                        } from 'ngx-sweetalert2';

import { environment                              } from '../../../environments/environment';
import { EditaPublicacionService                  } from './edita-publicacion.service';


@Component({
  selector: 'app-edita-publicacion',
  templateUrl: './edita-publicacion.component.html',
  styleUrls: ['./edita-publicacion.component.css']
})
export class EditaPublicacionComponent implements OnInit {

  public listaCateg: any = [];
  public formRegistro: FormGroup;
  public imagenPortada: string = 'assets/img/no_image.png';
  public accion: string = '';
  public idPublicacion: number = 0;
  public uploader: FileUploader = new FileUploader({ url: environment.apiUrl + 'almacen_archivos/publicaciones/upload', itemAlias: 'pdf' });
  public nombreArchivo: string = '';
  public errorArchivo: boolean = false;
  public diferenteArchivo: boolean = false;
  public mostrarProgress: boolean = false;

  @ViewChild('uploadDoc') uploadDocRef: ElementRef;
  @ViewChild('uploadPortada') uploadPortadaRef: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private _swal2: SweetAlertService,
    private route: ActivatedRoute,
    private _location: Location,
    private editaPublicacionService: EditaPublicacionService
  ) {
    this.formRegistro = this.formBuilder.group({
      nombre: ["", Validators.required],
      autor: ["", Validators.required],
      idCategoria: [0, Validators.required],
      descripcion: ["", Validators.required],
      portada: ["", Validators.required],
      nombreArchivo: ["", Validators.required]
    });
  }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      if (file.file.type == 'application/pdf') {
        this.nombreArchivo = file.file.name;
        this.formRegistro.controls['nombreArchivo'].setValue(this.nombreArchivo);
        this.errorArchivo = false;
        this.diferenteArchivo = true;
      } else {
        this.nombreArchivo = 'El archivo no es un pdf';
        this.formRegistro.controls['nombreArchivo'].setValue('');
        this.errorArchivo = true;
        this.uploader.clearQueue();
      }
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      setTimeout(() => {
        this._swal2.success({
          title: 'Registro agregado'
        })
        .then(() => {
          this._location.back();
        });
      }, 1000);
    };


    this.editaPublicacionService
      .getCategPublicaciones()
      .subscribe(
      data => {

        this.listaCateg = data.json();
        if (this.route.snapshot.params['id'] === undefined)
          this.accion = 'new';
        else {
          this.accion = 'edit';
          this.idPublicacion = parseInt(this.route.snapshot.params['id'], 10);

          this.editaPublicacionService
            .getPublicacion(this.idPublicacion)
            .subscribe(
            data => {
              let datos = data.json();
              this.formRegistro.controls['nombre'].setValue(datos.nombre);
              this.formRegistro.controls['autor'].setValue(datos.autor);
              this.formRegistro.controls['idCategoria'].setValue(datos.idCategoria);
              this.formRegistro.controls['descripcion'].setValue(datos.descripcion);
              if (datos.portada !== '') {
                this.formRegistro.controls['portada'].setValue(datos.portada);
                this.imagenPortada = datos.portada;
              }
              if (datos.nombreArchivo !== '') {
                this.formRegistro.controls['nombreArchivo'].setValue(datos.nombreArchivo);
                this.nombreArchivo = datos.nombreArchivo;
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


  changeListener($event): void {
    this.formRegistro.controls['portada'].setValue('');
    this.imagenPortada = 'assets/img/no_image.png';
    this.readThis($event.target);
  }


  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.formRegistro.controls['portada'].setValue(myReader.result);
      this.imagenPortada = myReader.result;
      console.log(this.imagenPortada);
    }

    if (file)
      myReader.readAsDataURL(file);
  }


  borraImg() {
    this.formRegistro.controls['portada'].setValue('');
    this.uploadPortadaRef.nativeElement.value = '';
    this.imagenPortada = 'assets/img/no_image.png';
  }


  borraArchivo() {
    this.formRegistro.controls['nombreArchivo'].setValue('');
    this.nombreArchivo = '';
    this.uploader.clearQueue();
    this.uploadDocRef.nativeElement.value = '';
  }


  actualizaDatos() {

    this.mostrarProgress = true;
    if (this.accion == 'new') {
      this.editaPublicacionService
        .agregaPublicacion(this.formRegistro.value)
        .subscribe(
        data => {
          setTimeout(() => {
            this.uploader.uploadAll();
          }, 300);
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
    else if (this.accion == 'edit') {
      this.editaPublicacionService
        .actualizaPublicacion(this.idPublicacion, this.formRegistro.value)
        .subscribe(
        data => {
          if (this.diferenteArchivo == true) {
            this.uploader.uploadAll();
          }
          else {
            this._swal2.success({
              title: 'Registro actualizado'
            })
              .then(() => {
                this._location.back();
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


  regresar() {
    this._location.back();
  }

}
