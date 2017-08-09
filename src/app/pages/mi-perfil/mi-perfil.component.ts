import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'ngx-sweetalert2';
import 'rxjs/add/operator/finally';

import { PerfilService } from '../../_services/perfil.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  private formPerfil: FormGroup;
  private formPassword: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _swal2: SweetAlertService,
    private perfilService: PerfilService
  ) { 
    let usuario = JSON.parse(localStorage.getItem('usuario'));

    this.formPerfil = this.formBuilder.group({
      nombreCompleto: [{ value: (usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno + ' ' + usuario.nombre), disabled: true}, Validators.required],
      codigoEmpleado: [{value: usuario.codigoEmpleado, disabled: true}, Validators.required],
      rfc: [{ value: usuario.rfc, disabled: true }, Validators.required],
      departamento: [{ value: usuario.departamento, disabled: true }, Validators.required],
      email: [{ value: usuario.email, disabled: false }, Validators.required]
    });

    this.formPassword = this.formBuilder.group({
      anterior: ['', Validators.required],
      contrasena: ['', Validators.required],
      confcontrasena: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  actualizaPerfil() {
    this.perfilService
      .actualizaPerfil(this.formPerfil.value.email)
      .finally(() => {
        // Execute after graceful or exceptionally termination
        //loading.dismiss();
      })
      .subscribe(
      data => {
        //console.log(data.json());
        this._swal2.success({ title: 'Datos de perfl actualizado' });
      },
      err => {
        let error = err.json().error;
        console.log(err.json());
      });

  }


  actualizaPassword() {
    if(this.formPassword.value.contrasena == this.formPassword.value.confcontrasena)
    {
      this.perfilService
        .actualizaPassword(this.formPassword.value.anterior, this.formPassword.value.contrasena)
        .finally(() => {
          // Execute after graceful or exceptionally termination
          //loading.dismiss();
        })
        .subscribe(
        data => {
          this._swal2.success({ title: 'Se ha cambiado La contraseña' });
          this.formPassword.reset();
        },
        err => {
          let error = err.json().error;
          //console.log(error);
          if (error.statusCode == 400) {
            console.error("La contraseña actual no es la correcta");
            this._swal2.error({ title: 'La contraseña actual no es la correcta' });
          }
        });
    }
    else
    {
        this._swal2.error({ title: 'Las nuevas contraseñas no coinciden' });
    }
    
  }

}
