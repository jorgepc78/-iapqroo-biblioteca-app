/* tslint:disable:member-ordering no-unused-variable */
import {ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { CommonModule                                     } from '@angular/common';
import { RouterModule                                     } from '@angular/router';

import { CoreComponent                                    } from './core.component';
import { NavbarComponent                                  } from './navbar/navbar.component';
import { NavbarService                                    } from './navbar/navbar.service';
import { UsuarioDataService                               } from './usuario-data.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CoreComponent, NavbarComponent],
  exports: [CoreComponent, NavbarComponent],
  providers: [NavbarService, UsuarioDataService]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
