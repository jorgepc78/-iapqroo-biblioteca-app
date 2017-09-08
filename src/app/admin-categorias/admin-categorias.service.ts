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

  getlistaCategorias(tipo: string): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let modelo: string = '';

    let filter = {
      order: ["descripcion ASC"],
    };

    if(tipo == 'libros')
      modelo = 'CategoriaLibros';
    else if(tipo == 'presentaciones')
      modelo = 'CategoriaPresentaciones';
    else if(tipo == 'publicaciones')
      modelo = 'CategoriaPublicaciones';
    else if(tipo == 'revistas')
      modelo = 'CategoriaRevistas';

    return this.http
      .get(environment.apiUrl + modelo + '/?filter=' + JSON.stringify(filter) + '&access_token=' + token.id, { headers: new Headers({ 'Content-Type': 'text/plain' }) })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  getElementosCategoria(idCategoria: number, tipo: string): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let modelo: string = '';

    if(tipo == 'libros') 
      modelo = 'CategoriaLibros';
    else if(tipo == 'presentaciones')
      modelo = 'CategoriaPresentaciones';
    else if(tipo == 'publicaciones')
      modelo = 'CategoriaPublicaciones';
    else if(tipo == 'revistas')
      modelo = 'CategoriaRevistas';

    return this.http
      .get(environment.apiUrl + modelo + '/' + idCategoria + '/elementos_contiene/count?access_token=' + token.id, { headers: new Headers({ 'Content-Type': 'text/plain' }) })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  nuevoRegistro(descripcion: string, tipo: string): Observable<any> {
    
    let token = JSON.parse(localStorage.getItem('token'));
    let modelo: string = '';

    if(tipo == 'libros') 
      modelo = 'CategoriaLibros';
    else if(tipo == 'presentaciones')
      modelo = 'CategoriaPresentaciones';
    else if(tipo == 'publicaciones')
      modelo = 'CategoriaPublicaciones';
    else if(tipo == 'revistas')
      modelo = 'CategoriaRevistas';

    return this.http
      .post(environment.apiUrl + modelo + '/?access_token=' + token.id, JSON.stringify({descripcion: descripcion}), { headers: new Headers({ 'Content-Type': 'application/json' }) })
      .map((response: any) => {
        return response;
      })
      .catch(this.handleError);
  }


  actualizaRegistro(idCategoria: number, descripcion: string, tipo: string): Observable<any> {
    
    let token = JSON.parse(localStorage.getItem('token'));
    let modelo: string = '';

    if(tipo == 'libros') 
      modelo = 'CategoriaLibros';
    else if(tipo == 'presentaciones')
      modelo = 'CategoriaPresentaciones';
    else if(tipo == 'publicaciones')
      modelo = 'CategoriaPublicaciones';
    else if(tipo == 'revistas')
      modelo = 'CategoriaRevistas';

    return this.http
      .patch(environment.apiUrl + modelo + '/' + idCategoria + '/?access_token=' + token.id, JSON.stringify({descripcion: descripcion}), { headers: new Headers({ 'Content-Type': 'application/json' }) })
      .map((response: any) => {
        return response;
      })
      .catch(this.handleError);
  }



  eliminaRegistro(id: number, tipo: string): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let modelo: string = '';

    if(tipo == 'libros')
      modelo = 'CategoriaLibros';
    else if(tipo == 'presentaciones')
      modelo = 'CategoriaPresentaciones';
    else if(tipo == 'publicaciones')
      modelo = 'CategoriaPublicaciones';
    else if(tipo == 'revistas')
      modelo = 'CategoriaRevistas';

    return this.http
      .delete(environment.apiUrl + modelo + '/' + id + '/?access_token=' + token.id, { headers: new Headers({ 'Content-Type': 'text/plain' }) })
      .map((response: any) => {
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
