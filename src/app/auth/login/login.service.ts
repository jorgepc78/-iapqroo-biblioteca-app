import { Injectable                               } from '@angular/core';
import { environment                              } from '../../../environments/environment';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable                               } from 'rxjs/Observable';

import { UsuarioDataService                       } from '../../core/usuario-data.service';

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
              verDocumentos   : false,
              verVideos       : false,
              editaDocumentos : false,
              editaVideos     : false,
              editaCatalogos  : false,
              editaUsuarios   : false
            };

            if (datos.perfil[0].name == 'visitante') {
              perfilMenu.verDocumentos   = true;
              perfilMenu.verVideos       = true;
              perfilMenu.editaDocumentos = false;
              perfilMenu.editaVideos     = false;
              perfilMenu.editaCatalogos  = false;
              perfilMenu.editaUsuarios   = false;
            }
            else if (datos.perfil[0].name == 'publicador') {
              perfilMenu.verDocumentos   = false;
              perfilMenu.verVideos       = false;
              perfilMenu.editaDocumentos = true;
              perfilMenu.editaVideos     = true;
              perfilMenu.editaCatalogos  = true;
              perfilMenu.editaUsuarios   = false;
            }
            else if (datos.perfil[0].name == 'admin') {
              perfilMenu.verDocumentos   = false;
              perfilMenu.verVideos       = false;
              perfilMenu.editaDocumentos = false;
              perfilMenu.editaVideos     = false;
              perfilMenu.editaCatalogos  = false;
              perfilMenu.editaUsuarios   = true;
            }
            else {
              perfilMenu.verDocumentos   = false;
              perfilMenu.verVideos       = false;
              perfilMenu.editaDocumentos = false;
              perfilMenu.editaVideos     = false;
              perfilMenu.editaCatalogos  = false;
              perfilMenu.editaUsuarios   = false;
            }

            let datosUsuario = {
              idUsuario       : datos.id,
              email           : datos.email,
              nombre          : datos.nombre,
              apellidoPaterno : datos.apellidoPaterno,
              apellidoMaterno : datos.apellidoMaterno,
              perfil          : perfilMenu
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
