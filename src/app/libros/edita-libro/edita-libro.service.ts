import { Injectable              } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment             } from '../../../environments/environment';
import { Observable              } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class EditaLibroService {

  private headers_get = new Headers({ 'Content-Type': 'text/plain' });
  private headers_post = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http
  ) { }


  getCategLibros(): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let filter = {
      order: ["descripcion ASC"]
    };

    return this.http
      .get(environment.apiUrl + 'CategoriaLibros/?filter=' + JSON.stringify(filter) + '&access_token=' + token.id, { headers: this.headers_get })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  getLibro(id: number): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));

    return this.http
      .get(environment.apiUrl + 'Libros/' + id + '/?access_token=' + token.id, { headers: this.headers_get })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  agregaLibro(data: any): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let dataTemp = {
      nombre: data.nombre,
      autor: data.autor,
      descripcion: data.descripcion,
      idCategoria: data.idCategoria,
      portada: data.portada,
      nombreArchivo: data.nombreArchivo
    };

    return this.http
      .post(environment.apiUrl + 'Libros?access_token=' + token.id, JSON.stringify(dataTemp), { headers: this.headers_post })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  actualizaLibro(id: number, data: any): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let dataTemp = {
      nombre: data.nombre,
      autor: data.autor,
      descripcion: data.descripcion,
      idCategoria: data.idCategoria,
      portada: data.portada,
      nombreArchivo: data.nombreArchivo
    };

    return this.http
      .patch(environment.apiUrl + 'Libros/' + id + '/?access_token=' + token.id, JSON.stringify(dataTemp), { headers: this.headers_post })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}