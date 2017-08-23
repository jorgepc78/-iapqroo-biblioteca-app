import { Injectable              } from '@angular/core';
import { environment             } from '../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Observable              } from 'rxjs/Observable';

import { UsuarioDataService } from '../core/usuario-data.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class MiPerfilService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http,
    private usuarioDataService: UsuarioDataService
  ) { }

  actualizaPerfil(data: any): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let dataTemp = {
      nombre: data.nombre,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      email: data.email
    };

    return this.http
      .patch(environment.apiUrl + 'Usuarios/' + data.idUsuario + '?access_token=' + token.id, JSON.stringify(dataTemp),  { headers: this.headers })
      .map((response: Response) => {
        this.usuarioDataService
          .setDatosUsuario(data)
          .then((res) => {
              return response;
          });
      })
      .catch(this.handleError);
  }


  actualizaPassword(nuevopass: string): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));

    return this.http
      .post(environment.apiUrl + 'Usuarios/reset-password?access_token=' + token.id, JSON.stringify({newPassword: nuevopass}), { headers: this.headers })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
