import { Component, OnInit                  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService                  } from 'ngx-sweetalert2';

import { MiPerfilService                    } from './mi-perfil.service';
import { UsuarioDataService                 } from '../core/usuario-data.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  private formPerfil: FormGroup;
  private formPassword: FormGroup;
  private usuario: any;

  constructor(
    private formBuilder: FormBuilder,
    private _swal2: SweetAlertService,
    private miPerfilService: MiPerfilService,
    private usuarioDataService: UsuarioDataService
  ) { 

    this.formPerfil = this.formBuilder.group({
      nombre:          [ { value: '', disabled: false }, Validators.required],
      apellidoPaterno: [ { value: '', disabled: false }, Validators.required],
      apellidoMaterno: [ { value: '', disabled: false }, Validators.required],
      email:           [ { value: '', disabled: false }, Validators.required]
    });

    this.formPassword = this.formBuilder.group({
      contrasena:     [ '', Validators.required],
      confcontrasena: [ '', Validators.required]
    });
  }

  ngOnInit() {
    this.usuarioDataService
      .getDatosUsuario()
      .then((data:any) => {
        this.usuario = data;
        this.formPerfil.setValue({
          nombre          : data.nombre,
          apellidoPaterno : data.apellidoPaterno,
          apellidoMaterno : data.apellidoMaterno,
          email           : data.email
        });        
      });
  }

  actualizaPerfil() {
    this.usuario.nombre = this.formPerfil.value.nombre;
    this.usuario.apellidoPaterno = this.formPerfil.value.apellidoPaterno;
    this.usuario.apellidoMaterno = this.formPerfil.value.apellidoMaterno;
    this.usuario.email = this.formPerfil.value.email;

    this.miPerfilService
      .actualizaPerfil(this.usuario)
      .subscribe(
      data => {
        this._swal2.success({ title: 'Datos de perfl actualizado' });
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


  actualizaPassword() {
    if(this.formPassword.value.contrasena == this.formPassword.value.confcontrasena)
    {
      this.miPerfilService
        .actualizaPassword(this.formPassword.value.contrasena)
        .subscribe(
        data => {
          this._swal2.success({ title: 'Se ha cambiado La contraseña' });
          this.formPassword.reset();
        },
        err => {
          let error = err.json().error;
          if (error.statusCode == 400) {
            this._swal2.error({ title: 'La contraseña actual no es la correcta' });
          }
        });
    }
    else
    {
        this._swal2.error({ title: 'Las contraseñas no coinciden' });
    }
    
  }

}
