import { Injectable              } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment             } from '../../../environments/environment';
import { Observable              } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AdminPresentacionesService {

  private headers = new Headers({ 'Content-Type': 'text/plain' });

  constructor(
    private http: Http
  ) { }

  getTotalPresentaciones(condicion: any): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    return this.http
      .get(environment.apiUrl + 'Presentaciones/count?where=' + JSON.stringify(condicion) + '&access_token=' + token.id, { headers: this.headers })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  getlistaPresentacionesAdmin(condicion: any, registrosPorPagina: number, paginaActual: number): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let skip = (paginaActual - 1) * registrosPorPagina;

    let filter = {
      where: condicion,
      order: ["nombre ASC"],
      include: ["categoria_pertenece"],
      limit: registrosPorPagina,
      skip: skip
    };

    return this.http
      .get(environment.apiUrl + 'Presentaciones/?filter=' + JSON.stringify(filter) + '&access_token=' + token.id, { headers: this.headers })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  eliminaPresentacion(id: number, nombreArchivo: string): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));

    return this.http
      .delete(environment.apiUrl + 'Presentaciones/' + id + '/?access_token=' + token.id, { headers: this.headers })
      .map(res => res.json())
      .mergeMap((response: any) => {
        return this.http
          .delete(environment.apiUrl + 'almacen_archivos/presentaciones/files/'+nombreArchivo+'/?access_token=' + token.id, { headers: this.headers })
          .map((response: any) => {
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
