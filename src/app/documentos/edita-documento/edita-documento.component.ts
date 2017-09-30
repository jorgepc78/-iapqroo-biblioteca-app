import { Component, ViewChild, ElementRef , OnInit } from '@angular/core';
import { Location                                  } from '@angular/common';
import { FormBuilder, FormGroup, Validators        } from '@angular/forms';
import { ActivatedRoute                            } from '@angular/router';

import { TreeviewItem, TreeviewConfig              } from 'ngx-treeview';
import { FileUploader                              } from 'ng2-file-upload/ng2-file-upload';
import { SweetAlertService                         } from 'ngx-sweetalert2';

import { environment                               } from '../../../environments/environment';
import { EditaDocumentoService                     } from './edita-documento.service';

@Component({
  selector: 'app-edita-documento',
  templateUrl: './edita-documento.component.html',
  styleUrls: ['./edita-documento.component.css']
})
export class EditaDocumentoComponent implements OnInit {

  public nodos: TreeviewItem[];
  public listaCateg: any = [];
  public formRegistro: FormGroup;
  public imagenPortada: string = 'assets/img/no_image.png';
  public accion: string = '';
  public idLibro: number = 0;
  public uploader: FileUploader = new FileUploader({ url: environment.apiUrl + 'almacen_archivos/documentos/upload', itemAlias: 'pdf' });
  public nombreArchivo: string = '';
  public errorArchivo: boolean = false;
  public diferenteArchivo: boolean = false;
  public mostrarProgress: boolean = false;
  public msgProgress: string = '';

  public config = TreeviewConfig.create({
        hasAllCheckBox: false,
        hasFilter: false,
        hasCollapseExpand: false
  });

  public idCategoriaSelec: number = 0;

  @ViewChild('uploadDoc') uploadDocRef: ElementRef;
  @ViewChild('uploadPortada') uploadPortadaRef: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private _swal2: SweetAlertService,
    private route: ActivatedRoute,
    private _location: Location,
    private editaDocumentoService: EditaDocumentoService
  ) {
    this.formRegistro = this.formBuilder.group({
      nombre: ["", Validators.required],
      autor: ["", Validators.required],
      idCategoria:[0,[Validators.required, Validators.min(1)]],
      descripcion: ["", Validators.required],
      portada: ["", Validators.required],
      nombreArchivo: ["", Validators.required]
    });
  }

  ngOnInit() {

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
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

    this.uploader.onBeforeUploadItem = (file) => { 
      //file.file.name = this.idLibro + '_' + file.file.name;
    };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //console.log("ImageUpload:uploaded:", item, status, response);
      setTimeout(() => {
        this.mostrarProgress = false;
        this._swal2.success({
          title: 'Registro agregado'
        })
        .then(() => {
          this._location.back();
        });

      }, 1000);
    };


    this.editaDocumentoService
      .getCategDocumentos()
      .subscribe(
      data => {

        let datosTemp: any = [];
        data.json().map(record => {
          datosTemp.push({
            value: record.idCategoria,
            idPadre: record.idPadre,
            text: record.descripcion,
            collapsed: false
          });
        });

        let temp = this._makeTree({
            q: this._queryTreeSort({
                q: datosTemp
            })
        });

        temp.map(record => {
          this.listaCateg.push(
            new TreeviewItem(record)
          );
        });

        if (this.route.snapshot.params['id'] === undefined)
          this.accion = 'new';
        else {
          this.accion = 'edit';
          this.idLibro = parseInt(this.route.snapshot.params['id'], 10);

          this.editaDocumentoService
            .getDocumento(this.idLibro)
            .subscribe(
            data => {
              let datos = data.json();
              this.formRegistro.controls['nombre'].setValue(datos.nombre);
              this.formRegistro.controls['autor'].setValue(datos.autor);
              this.formRegistro.controls['idCategoria'].setValue(datos.idCategoria);
              this.idCategoriaSelec = datos.idCategoria;

              setTimeout(() => {
                this.formRegistro.controls['descripcion'].setValue(datos.descripcion);
              }, 300);

              if(datos.portada !== '') {
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


  onValueChange(value: number) {
    if(value !== undefined) {
      this.idCategoriaSelec = value;
      this.formRegistro.controls['idCategoria'].setValue(this.idCategoriaSelec);
    }
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
    if (this.accion == 'new')
    {
      this.msgProgress = 'Subiendo archivo y creando documento...';
      this.editaDocumentoService
        .agregaDocumento(this.formRegistro.value)
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
    else if (this.accion == 'edit')
    {
      this.msgProgress = 'Actualizando documento...';
      this.editaDocumentoService
        .actualizaDocumento(this.idLibro, this.formRegistro.value)
        .subscribe(
        data => {
          if (this.diferenteArchivo == true) {
            this.uploader.uploadAll();
          }
          else {
            this.mostrarProgress = false;
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


  _makeTree(options) {
    var children, e, id, o, pid, temp, _i, _len, _ref;
    id = options.id || "value";
    pid = options.parentid || "idPadre";
    children = options.children || "children";
    temp = {};
    o = [];
    _ref = options.q;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      //e[children] = [];
      temp[e[id]] = e;
      if (temp[e[pid]] != null) {
        if(temp[e[pid]][children] === undefined)
          temp[e[pid]][children] = [];
        temp[e[pid]][children].push(e);
      } else {
        o.push(e);
      }
    }
    return o;
  };  


  _queryTreeSort(options) {
    var cfi, e, i, id, o, pid, rfi, ri, thisid, _i, _j, _len, _len1, _ref, _ref1;
    id = options.id || "value";
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
