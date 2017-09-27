import { Component, OnInit                  } from '@angular/core';
import { Location                           } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecuperaPasswordService            } from './recupera-password.service';

@Component({
  selector: 'app-recupera-password',
  templateUrl: './recupera-password.component.html',
  styleUrls: ['./recupera-password.component.css']
})
export class RecuperaPasswordComponent implements OnInit {

  public formRecuperaPass: FormGroup;
  public emailEnviado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _location: Location,
    private recuperaPasswordService: RecuperaPasswordService
  ) {
    this.formRecuperaPass = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])]
    });    
  }

  ngOnInit() {
  }

  enviaEmail() {
    let email = this.formRecuperaPass.value.email;
    this.recuperaPasswordService
      .recuperaPass(email)
      .subscribe(
      data => {
        this.emailEnviado = true;
      },
      err => {
        if (err.json().error == undefined)
          console.log("Error de conexion");
        else {
          let error = err.json().error;
          if (error.statusCode == 400)
          {
            console.log("codigo de autorizacion no valido");
          }
        }
      });
  }

  regresar() {
    this._location.back();
  }

}
