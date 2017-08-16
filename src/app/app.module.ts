import { BrowserModule                          } from '@angular/platform-browser';
import { NgModule, LOCALE_ID                    } from '@angular/core';
import { FormsModule                            } from '@angular/forms';
import { HttpModule, BrowserXhr                 } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';

/* App Root */
import { AppComponent                           } from './app.component';

/* Feature Modules */
import { LoginModule                            } from './login/login.module';
import { CoreModule                             } from './core/core.module';

/* Routing Module */
import { AppRoutingModule                       } from './app-routing.module';

/* Guards*/
import { AuthGuard                              } from './core/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    NgProgressModule,
    AppRoutingModule,
    LoginModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-MX" },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
