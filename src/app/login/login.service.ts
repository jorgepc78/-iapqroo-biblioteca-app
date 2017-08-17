import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UsuarioDataService } from '../core/usuario-data.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {
  
  constructor(
    private http: Http,
    private usuarioDataService: UsuarioDataService
  ) { }

  loginUser(email: string, password: string): Observable<any> {
    return this.http
      .post(environment.apiUrl + 'Usuarios/login', JSON.stringify({ email: email, password: password }), { headers: new Headers({ 'Content-Type': 'application/json' }) })
      .map(res => res.json())
      .mergeMap((response: any) => {

        let resp = response;
        let token = {
          id: resp.id,
          ttl: resp.ttl,
          created: resp.created
        };
        localStorage.setItem('token', JSON.stringify(token));

        
        const filter = {
          fields: ["id", "email", "nombre", "apellidoPaterno", "apellidoMaterno"],
          include: [
            {
              relation: "perfil",
              scope: {
                fields: ["name"]
              }
            }
          ]
        };

        let myParams = new URLSearchParams();
        myParams.set('filter', JSON.stringify(filter));
        myParams.set('access_token', token.id);

        return this.http
          .get(environment.apiUrl + 'Usuarios/' + resp.userId, { params: myParams, headers: new Headers({ 'Content-Type': 'text/plain' }) })
          .map((response: Response) => {

            let datos = response.json();
            const perfilMenu: any = {
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

            if (datos.perfil[0].name == 'visitante') {
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
            else if (datos.perfil[0].name == 'publicador') {
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
            else if (datos.perfil[0].name == 'admin') {
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
            else {
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


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
