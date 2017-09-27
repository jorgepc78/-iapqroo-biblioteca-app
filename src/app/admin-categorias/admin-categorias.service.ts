import { Injectable              } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment             } from '../../environments/environment';
import { Observable              } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AdminCategoriasService {

  constructor(
    private http: Http
  ) { }

  getlistaCategorias(tipoDocumento: string): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let modelo: string = '';

    let filter = {
      order: ["descripcion ASC"],
    };

    return this.http
      .get(environment.apiUrl + tipoDocumento + '/?filter=' + JSON.stringify(filter) + '&access_token=' + token.id, { headers: new Headers({ 'Content-Type': 'text/plain' }) })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  actualizaRegistro(idCategoria: number, descripcion: string, tipoDocumento: string): Observable<any> {
    
    let token = JSON.parse(localStorage.getItem('token'));
    let modelo: string = '';

    return this.http
      .patch(environment.apiUrl + tipoDocumento + '/' + idCategoria + '/?access_token=' + token.id, JSON.stringify({descripcion: descripcion}), { headers: new Headers({ 'Content-Type': 'application/json' }) })
      .map((response: any) => {
        return response;
      })
      .catch(this.handleError);
  }


  nuevoRegistro(descripcion: string, idPadre: number, tipoDocumento: string): Observable<any> {
    
    let token = JSON.parse(localStorage.getItem('token'));
    let datos = {
      idPadre: idPadre,
      descripcion: descripcion
    };

    return this.http
      .post(environment.apiUrl + tipoDocumento + '/?access_token=' + token.id, JSON.stringify(datos), { headers: new Headers({ 'Content-Type': 'application/json' }) })
      .map((response: any) => {
        return response;
      })
      .catch(this.handleError);
  }


  getElementosCategoria(idCategoria: number, tipoDocumento: string): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));

    return this.http
      .get(environment.apiUrl + tipoDocumento + '/' + idCategoria + '/elementos_contiene/count?access_token=' + token.id, { headers: new Headers({ 'Content-Type': 'text/plain' }) })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  eliminaRegistro(idCategoria: number, tipoDocumento: string): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));

    return this.http
      .delete(environment.apiUrl + tipoDocumento + '/' + idCategoria + '/?access_token=' + token.id, { headers: new Headers({ 'Content-Type': 'text/plain' }) })
      .map((response: any) => {
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
