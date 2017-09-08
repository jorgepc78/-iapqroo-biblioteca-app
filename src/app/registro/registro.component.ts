import { Component, OnInit                  } from '@angular/core';
import { Router                             } from '@angular/router';
import { Location                           } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegistroService                    } from './registro.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public mostrarMsgError: boolean = false;
  public txtMsgError: string = '';
  public colorMsgError: string = 'success';

  public formRegister: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private _location: Location,
    private registroService: RegistroService
  ) {
    this.formRegister = this.formBuilder.group({
      nombre:          [ "Juan", Validators.required],
      apellidoPaterno: [ "Perez", Validators.required],
      apellidoMaterno: [ "Vazquez", Validators.required],
      email:           [ "juan@gmail.com", Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
      contrasena:      [ "txfiles", Validators.required],
      confcontrasena:  [ "txfiles", Validators.required]
    });
  }


  ngOnInit() {
  }


  registerUsr() {
    if (this.formRegister.value.contrasena == this.formRegister.value.confcontrasena)
    {
        this.registroService
          .registerUser(this.formRegister.value)
          .subscribe(
          data => {
              localStorage.setItem('registro', 'regok');
              this.route.navigate(['registro-realizado']);
          },
          err => {
            let error = err.json().error;
            //console.log(err.json().error);
            if (error.statusCode == 422) {
              this.txtMsgError = 'El email ya se encuentra registrado';
              this.colorMsgError = 'danger';
              this.mostrarMsgError = true;
            }
            setTimeout(() => {
              this.mostrarMsgError = false;
              this.txtMsgError = '';
            }, 2000);
          });
    }
    else
    {
        this.txtMsgError = 'Las contraseñas no coinciden';
        this.colorMsgError = 'danger';
        this.mostrarMsgError = true;
        setTimeout(() => {
          this.mostrarMsgError = false;
          this.txtMsgError = '';
        }, 2000);      
    }
  }


  regresar() {
    this._location.back();
  }

}
