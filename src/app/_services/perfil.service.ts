import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PerfilService {
  
  private headers = new Headers({ 'Content-Type': 'text/plain' });
  
  constructor(
    private http: Http
  ) { }

  actualizaPerfil(email:string): Observable<any> {
      
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let token = JSON.parse(localStorage.getItem('token'));

    return this.http
      .patch(environment.apiUrl + 'Usuarios/'+usuario.idUsuario+'?access_token=' + token.id,
      JSON.stringify({
        email: email
      }),
      { headers: this.headers })
      .map((response: Response) => {
        usuario.email = email;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        return response;
      })
      .catch(this.handleError);
  }


  actualizaPassword(anteriorpass:string, nuevopass:string): Observable<any> {
      
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let token = JSON.parse(localStorage.getItem('token'));

    return this.http
      .post(environment.apiUrl + 'Usuarios/change-password?access_token=' + token.id,
      JSON.stringify({
        oldPassword: anteriorpass,
        newPassword: nuevopass
      }),
      { headers: this.headers })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
