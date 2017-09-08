import { Component, OnInit                  } from '@angular/core';
import { ActivatedRoute                     } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService               } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public passEnviado: boolean = false;
  public formNewPass: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService
  ) {
    this.formNewPass = this.formBuilder.group({
      password: ["", Validators.required]
    });    
  }

  ngOnInit() {
  }

  actualizaPass() {
    let token = this.route.snapshot.queryParams['t'];

    this.resetPasswordService
      .actualizaPass(this.formNewPass.value.password, token)
      .subscribe(
      data => {
        this.passEnviado = true;
      },
      err => {
        console.log(err);
      });    
  }

}
