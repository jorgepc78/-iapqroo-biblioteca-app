import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './login.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LoginRoutingModule],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
