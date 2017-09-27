import { Injectable              } from '@angular/core';
import { environment             } from '../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Observable              } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RegistroService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http
  ) { }

  registerUser(data: any): Observable<any> {

    let dataTemp = {
      nombre: data.nombre,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      email: data.email,
      password: data.contrasena
    };

    return this.http
      .post(environment.apiUrl + 'Usuarios', JSON.stringify(dataTemp), { headers: this.headers })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
