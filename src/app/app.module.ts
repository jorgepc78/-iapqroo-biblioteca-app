import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';

import { AppComponent } from './app.component';

import { UsuarioDataService } from './_services/usuario-data.service';

/*modulos de los componentes*/
import { LoginModule } from './login/login.module';
import { PagesModule } from './pages/pages.module';

/*Routing module*/
import { AppRoutingModule } from './app-routing.module';

/*Guards*/
import { AuthGuard } from './_guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    AppRoutingModule,
    LoginModule,
    PagesModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-MX" },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    UsuarioDataService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
