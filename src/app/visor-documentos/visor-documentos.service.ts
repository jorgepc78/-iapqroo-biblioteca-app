import { Injectable                                                   } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { environment                                                  } from '../../environments/environment';
import { Observable                                                   } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class VisorDocumentosService {

  private headers = new Headers({ 'Content-Type': 'text/plain' });

  constructor(
    private http: Http
  ) { }

  getNombrePDF(tipo: string, id: number): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));

    let filter = {
      fields: ["nombreArchivo", "nombre"]
    };

    return this.http
      .get(environment.apiUrl + tipo + '/' + id + '?filter=' + JSON.stringify(filter) + '&access_token=' + token.id, { headers: this.headers })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

/*servicio de prueba*/
  getPDF(nombreArchivo: string, contenedor: string, id: number): Promise<any> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/pdf');

    let options = new RequestOptions({ headers: headers });
    // Ensure you set the responseType to Blob.
    //options.responseType = ResponseContentType.Blob;
    options.responseType = ResponseContentType.ArrayBuffer;

    let token = JSON.parse(localStorage.getItem('token'));

    return this.http
      .get(environment.apiUrl + "almacen_archivos/" + contenedor + "/download/" + nombreArchivo + "?access_token=" + token.id, options)
      .toPromise()
      .then((response: any) => {
        var blob = new Blob([(<any>response)._body], { type: 'application/pdf' });
        let fileBlob = response.blob();
        return blob;

      })
      .catch(this.handleError);
  }



  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
