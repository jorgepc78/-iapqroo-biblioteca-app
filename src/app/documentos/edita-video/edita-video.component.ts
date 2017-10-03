import { Component, ViewChild, ElementRef , OnInit } from '@angular/core';
import { Location                                  } from '@angular/common';
import { FormBuilder, FormGroup, Validators        } from '@angular/forms';
import { ActivatedRoute                            } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';

import { TreeviewItem, TreeviewConfig              } from 'ngx-treeview';
import { FileUploader                              } from 'ng2-file-upload/ng2-file-upload';
import { SweetAlertService                         } from 'ngx-sweetalert2';

import { environment                               } from '../../../environments/environment';
import { EditaVideoService                         } from './edita-video.service';

@Component({
  selector: 'app-edita-video',
  templateUrl: './edita-video.component.html',
  styleUrls: ['./edita-video.component.css']
})
export class EditaVideoComponent implements OnInit {

  public nodos: TreeviewItem[];
  public listaCategArray: any = [];
  public listaCateg: any = [];
  public formRegistro: FormGroup;
  public imagenPortada: string = 'assets/img/no_image.png';
  public accion: string = '';
  public idVideo: number = 0;
  public urltempVideo: any = null;
  public msgerrorUrlVideo: string = '';
  public showErrorUrlVideo: boolean = false;
  public showSpinnerVideo: boolean = false;
  public mostrarProgress: boolean = false;
  public msgProgress: string = '';

  public config = TreeviewConfig.create({
        hasAllCheckBox: false,
        hasFilter: false,
        hasCollapseExpand: false
  });

  public idCategoriaSelec: number = 0;

  @ViewChild('uploadPortada') uploadPortadaRef: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private _swal2: SweetAlertService,
    private route: ActivatedRoute,
    private _location: Location,
    private _sanitizer: DomSanitizer,
    private editaVideoService: EditaVideoService
  ) {
    this.formRegistro = this.formBuilder.group({
      nombre: ["", Validators.required],
      autor: ["", Validators.required],
      idCategoria:[0,[Validators.required, Validators.min(1)]],
      rutaCategoria:[""],
      descripcion: ["", Validators.required],
      portada: ["", Validators.required],
      url: ["", Validators.required]
    });
  }

  ngOnInit() {

    this.editaVideoService
      .getCategVideos()
      .subscribe(
      data => {

        this.listaCategArray = data.json();

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
          this.idVideo = parseInt(this.route.snapshot.params['id'], 10);

          this.editaVideoService
            .getVideo(this.idVideo)
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
              if (datos.url !== '') {
                this.formRegistro.controls['url'].setValue(datos.url);
                this.urltempVideo = this._sanitizer.bypassSecurityTrustResourceUrl(datos.url);
                //Cargar preview del video
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


  onValueChange(value: number) { //treecombobox
    if(value !== undefined) {
      this.idCategoriaSelec = value;
      this.formRegistro.controls['idCategoria'].setValue(this.idCategoriaSelec);
    }
  }


  changeListener($event) { //portada
    this.formRegistro.controls['portada'].setValue('');
    this.imagenPortada = 'assets/img/no_image.png';
    this.readThis($event.target);
  }


  readThis(inputValue: any) { //portada
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.formRegistro.controls['portada'].setValue(myReader.result);
      this.imagenPortada = myReader.result;
    }
    
    if (file)
      myReader.readAsDataURL(file);
  }


  onBlurMethod() {
    
    this.urltempVideo = '';
    if(this.formRegistro.value.url == '')
      return;
    //validar si el url pertenece a youtube, dailymotion o vimeo. solo se acepta estos urls.
    let embed = 0;

    let index = this.formRegistro.value.url.indexOf('youtube');
    if(index > 0) {
      embed = this.formRegistro.value.url.indexOf('embed');
      if(embed < 0) {
        this.msgerrorUrlVideo = 'La url de youtube es incorrecta, debe tener la cadena "embed" en la ruta';
        this.showErrorUrlVideo = true;
        setTimeout(() => {
          this.msgerrorUrlVideo = '';
          this.showErrorUrlVideo = false;
        },3000);
        return;
      }
    }
    else
    {
        index = this.formRegistro.value.url.indexOf('dailymotion');
        if(index > 0) {
          embed = this.formRegistro.value.url.indexOf('embed');
          if(embed < 0) {
            this.msgerrorUrlVideo = 'La url de dailymotion es incorrecta, debe tener la cadena "embed" en la ruta';
            this.showErrorUrlVideo = true;
            setTimeout(() => {
              this.msgerrorUrlVideo = '';
              this.showErrorUrlVideo = false;
            },3000);
            return;
          }
        }
        else
        {
            index = this.formRegistro.value.url.indexOf('vimeo');
            if(index > 0) {
              embed = this.formRegistro.value.url.indexOf('player');
              if(embed < 0) {
                this.msgerrorUrlVideo = 'La url de vimeo es incorrecta, debe tener la cadena "player" en la ruta';
                this.showErrorUrlVideo = true;
                setTimeout(() => {
                  this.msgerrorUrlVideo = '';
                  this.showErrorUrlVideo = false;
                },3000);
                return;
              }
            }
            else
            {
                this.msgerrorUrlVideo = 'La url del video debe ser de youtube, dailymotion o vimeo';
                this.showErrorUrlVideo = true;
                setTimeout(() => {
                  this.msgerrorUrlVideo = '';
                  this.showErrorUrlVideo = false;
                },3000);
                return;
            }
        }
    }

    this.showSpinnerVideo = true;
    setTimeout(() => {
      this.urltempVideo = this._sanitizer.bypassSecurityTrustResourceUrl(this.formRegistro.value.url);
      this.showSpinnerVideo = false;
    },1000);
  }


  borraImg() {
    this.formRegistro.controls['portada'].setValue('');
    this.uploadPortadaRef.nativeElement.value = '';
    this.imagenPortada = 'assets/img/no_image.png';
  }


  actualizaDatos() {

    this.mostrarProgress = true;

    let indice: number = 0;
    let valor: number= this.formRegistro.value.idCategoria;
    let rutaArray: any = [];
    let continuar: boolean = true;

    while(continuar) {
      indice = this.listaCategArray.findIndex(x => x.idCategoria === valor);
      if(this.listaCategArray[indice].idPadre == 0)
        continuar = false;

      rutaArray.unshift(this.listaCategArray[indice].descripcion);
      valor = this.listaCategArray[indice].idPadre;
    }
    this.formRegistro.controls['rutaCategoria'].setValue('/ ' + rutaArray.join(' / '));

    if (this.accion == 'new')
    {
      this.msgProgress = 'creando video...';
      this.editaVideoService
        .agregaVideo(this.formRegistro.value)
        .subscribe(
        data => {
          this.mostrarProgress = false;
          this._swal2.success({
            title: 'Registro creado'
          })
          .then(() => {
            this._location.back();
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
    }
    else if (this.accion == 'edit')
    {
      this.msgProgress = 'Actualizando video...';
      this.editaVideoService
        .actualizaVideo(this.idVideo, this.formRegistro.value)
        .subscribe(
        data => {
          this.mostrarProgress = false;
          this._swal2.success({
            title: 'Registro actualizado'
          })
          .then(() => {
            this._location.back();
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
