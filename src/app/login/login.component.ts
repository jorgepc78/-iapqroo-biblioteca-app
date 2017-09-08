import { Component, OnInit                  } from '@angular/core';
import { Router                             } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService                       } from './login.service';

import 'rxjs/add/operator/finally';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public mostrarMsgError: boolean = false;
  public txtMsgError: string = '';
  public colorMsgError: string = 'success';

  public formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private loginService: LoginService
  ) {
    this.formLogin = this.formBuilder.group({
      email: ["publicador@hotmail.com", Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
      password: ["txfiles", Validators.required]
    });
  }

  ngOnInit() {
  }

  loginUsr() {
    this.loginService
      .loginUser(this.formLogin.value.email, this.formLogin.value.password)
      .finally(() => {
        // Execute after graceful or exceptionally termination
        //loading.dismiss();
      })
      .subscribe(
      data => {
        let result = data.json();
        if (result.perfil[0].name == 'visitante')
          this.route.navigate(['principal/consultalibros']);
        else if (result.perfil[0].name == 'publicador')
          this.route.navigate(['principal/adminlibros']);
        else if (result.perfil[0].name == 'admin')
          this.route.navigate(['principal/usuarios']);
      },
      err => {
        let error = err.json().error;
        //console.log(err.json().error);
        if (error.code == 'LOGIN_FAILED_EMAIL_NOT_VERIFIED')
        {
            this.txtMsgError = 'El correo electrónico no ha sido verificado';
            this.colorMsgError = 'danger';
            this.mostrarMsgError = true;
        }
        else if (error.code == 'LOGIN_FAILED')
        {
            this.txtMsgError = 'Nombre de usuario/contraseña incorrectos';
            this.colorMsgError = 'danger';
            this.mostrarMsgError = true;
        }
        setTimeout(() => {
          this.mostrarMsgError = false;
          this.txtMsgError = '';
        }, 2000);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
      );
  }

}
