import { Injectable                               } from '@angular/core';
import { environment                              } from '../../../environments/environment';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable                               } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class RecuperaPasswordService {

  constructor(
    private http: Http
  ) { }

  recuperaPass(email: string): Observable<any> {

    return this.http
      .post(environment.apiUrl + 'Usuarios/reset',  JSON.stringify({ email: email }), { headers: new Headers({ 'Content-Type': 'application/json' }) })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
