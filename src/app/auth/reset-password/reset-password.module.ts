import { NgModule                   } from '@angular/core';
import { CommonModule               } from '@angular/common';
import { ReactiveFormsModule        } from '@angular/forms';
import { ResetPasswordComponent     } from './reset-password.component';
import { ResetPasswordService       } from './reset-password.service';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ResetPasswordRoutingModule],
  declarations: [ResetPasswordComponent],
  providers: [ResetPasswordService]
})
export class ResetPasswordModule { }
