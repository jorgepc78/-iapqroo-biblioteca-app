import { Component, OnInit                  } from '@angular/core';
import { ActivatedRoute                     } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmacionRegistroService        } from './confirmacion-registro.service';

@Component({
  selector: 'app-confirmacion-registro',
  templateUrl: './confirmacion-registro.component.html',
  styleUrls: ['./confirmacion-registro.component.css']
})
export class ConfirmacionRegistroComponent implements OnInit {

  public error: boolean = false;
  public formErrorValidacion: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private confirmacionRegistroService: ConfirmacionRegistroService
  ) {
    this.formErrorValidacion = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])]
    });    
  }

  ngOnInit() {
    let uid = this.route.snapshot.queryParams['uid'];
    let token = this.route.snapshot.queryParams['token'];

    this.confirmacionRegistroService
      .confirmaRegistro(uid, token)
      .subscribe(
      data => {
      },
      err => {
        if (err.json().error == undefined)
          console.log("Error de conexion");
        else {
          let error = err.json().error;
          if (error.statusCode == 400)
          {
            this.error = true;
            console.log("codigo de autorizacion no valido");
          }
        }
      });
  }

}
