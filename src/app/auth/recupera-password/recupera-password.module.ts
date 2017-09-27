import { NgModule                      } from '@angular/core';
import { CommonModule                  } from '@angular/common';
import { ReactiveFormsModule           } from '@angular/forms';
import { RecuperaPasswordComponent     } from './recupera-password.component';
import { RecuperaPasswordService       } from './recupera-password.service';
import { RecuperaPasswordRoutingModule } from './recupera-password-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RecuperaPasswordRoutingModule],
  declarations: [RecuperaPasswordComponent],
  providers: [RecuperaPasswordService]
})
export class RecuperaPasswordModule { }
