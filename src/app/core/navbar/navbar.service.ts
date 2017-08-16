import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';

import { UsuarioDataService } from '../usuario-data.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class NavbarService {

  private headers2 = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http,
    private usuarioDataService: UsuarioDataService
  ) { }

  logoutUser(): Observable<any> {
    let token = JSON.parse(localStorage.getItem('token'));
    return this.http
      .post(environment.apiUrl + 'Usuarios/logout?access_token=' + token.id, { headers: this.headers2 })
      .map((response: Response) => {

        localStorage.removeItem('token');

        this.usuarioDataService
          .eliminaUsuario()
          .then((res) => {
          });
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
