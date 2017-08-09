import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers } from '@angular/http';

import { UsuarioDataService } from './usuario-data.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  private headers = new Headers({ 'Content-Type': 'text/plain' });
  private headers2 = new Headers({ 'Content-Type': 'application/json' });
  private token = '';

  constructor(
    private http: Http,
    private usuarioDataService: UsuarioDataService
  ) { }

  loginUser(email: string, password: string): Observable<any> {
    return this.http
      .post(environment.apiUrl + 'Usuarios/login',
      JSON.stringify({ email: email, password: password }),
      { headers: this.headers2 })
      .map(res => res.json())
      .mergeMap((response: any) => {

          let resp = response;
          let token = {
            id: resp.id,
            ttl: resp.ttl,
            created: resp.created
          };
          localStorage.setItem('token', JSON.stringify(token));

          return this.http
            .get(environment.apiUrl + 'Usuarios/' + resp.userId + '?filter={"fields":["id","email","nombre","apellidoPaterno","apellidoMaterno"],"include":[{"relation":"perfil","scope":{"fields":["name"]}}]}&access_token=' + token.id, { headers: this.headers })
            .map((response: Response) => {

              let datos = response.json();
              const perfilMenu:any = {
                verLibros: false,
                verRevistas: false,
                verPublica: false,
                verPresenta: false,
                editaLibros: false,
                editaRevistas: false,
                editaPublica: false,
                editaPresenta: false,
                editaUsuarios: false
              };

              if (datos.perfil[0].name == 'visitante')
              {
                perfilMenu.verLibros = true;
                perfilMenu.verRevistas = true;
                perfilMenu.verPublica = true;
                perfilMenu.verPresenta = true;
                perfilMenu.editaLibros = false;
                perfilMenu.editaRevistas = false;
                perfilMenu.editaPublica = false;
                perfilMenu.editaPresenta = false;
                perfilMenu.editaUsuarios = false;
              }
              else if (datos.perfil[0].name == 'publicador')
              {
                perfilMenu.verLibros = false;
                perfilMenu.verRevistas = false;
                perfilMenu.verPublica = false;
                perfilMenu.verPresenta = false;
                perfilMenu.editaLibros = true;
                perfilMenu.editaRevistas = true;
                perfilMenu.editaPublica = true;
                perfilMenu.editaPresenta = true;
                perfilMenu.editaUsuarios = false;
              }
              else if (datos.perfil[0].name == 'admin')
              {
                perfilMenu.verLibros = false;
                perfilMenu.verRevistas = false;
                perfilMenu.verPublica = false;
                perfilMenu.verPresenta = false;
                perfilMenu.editaLibros = false;
                perfilMenu.editaRevistas = false;
                perfilMenu.editaPublica = false;
                perfilMenu.editaPresenta = false;
                perfilMenu.editaUsuarios = true;
              }
              else
              {
                perfilMenu.verLibros = false;
                perfilMenu.verRevistas = false;
                perfilMenu.verPublica = false;
                perfilMenu.verPresenta = false;
                perfilMenu.editaLibros = false;
                perfilMenu.editaRevistas = false;
                perfilMenu.editaPublica = false;
                perfilMenu.editaPresenta = false;
                perfilMenu.editaUsuarios = false;
              }

              let datosUsuario = {
                idUsuario: datos.id,
                email: datos.email,
                nombre: datos.nombre,
                apellidoPaterno: datos.apellidoPaterno,
                apellidoMaterno: datos.apellidoMaterno,
                perfil: perfilMenu
              };

              this.usuarioDataService
                .setDatosUsuario(datosUsuario)
                .then((res) => {
                });

              return response;
            })
            .catch(this.handleError);
      })
      .catch(this.handleError);
  }


  logoutUser(): Observable<any> {
    let token = JSON.parse(localStorage.getItem('token'));
    return this.http
      .post(environment.apiUrl + 'Usuarios/logout?access_token=' + token.id, { headers: this.headers2 })
      .map((response: Response) => {
        this.token = '';
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