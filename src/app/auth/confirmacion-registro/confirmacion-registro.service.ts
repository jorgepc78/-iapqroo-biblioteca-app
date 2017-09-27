import { Injectable                               } from '@angular/core';
import { environment                              } from '../../../environments/environment';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable                               } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ConfirmacionRegistroService {

  constructor(
    private http: Http
  ) { }

  confirmaRegistro(uid: number, token: string): Observable<any> {

    return this.http
      .get(environment.apiUrl + 'Usuarios/confirm?uid=' + uid + '&token=' + token, { headers: new Headers({ 'Content-Type': 'text/plain' }) })
      .map((response: Response) => {

        let datos = response.json();
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
