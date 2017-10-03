import { Injectable                                                   } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { environment                                                  } from '../../../environments/environment';
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

  getNombreUrlDocumento(tipoDocumento: string, id: number): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let filter: any = {};
    let fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;

    if(tipoDocumento == 'Documentos') {
        filter = {
          fields: ["idDocumento","nombreArchivo", "nombre"],
          include: [
            {
              relation: "visitas",
              scope: {
                where: {
                  and: [
                    {anio: anio},
                    {mes: mes}
                  ]
                }
              }
            }
          ]
        };      
    }
    else {
        filter = {
          fields: ["idVideo","url", "nombre"],
          include: [
            {
              relation: "visitas",
              scope: {
                where: {
                  and: [
                    {anio: anio},
                    {mes: mes}
                  ]
                }
              }
            }
          ]
        };      
    }

    return this.http
      .get(environment.apiUrl + tipoDocumento + '/' + id + '?filter=' + JSON.stringify(filter) + '&access_token=' + token.id, { headers: this.headers })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  getPDF(nombreArchivo: string): Promise<any> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/pdf');

    let options = new RequestOptions({ headers: headers });
    // Ensure you set the responseType to Blob.
    //options.responseType = ResponseContentType.Blob;
    options.responseType = ResponseContentType.ArrayBuffer;

    let token = JSON.parse(localStorage.getItem('token'));

    return this.http
      .get(environment.apiUrl + "almacen_archivos/documentos/download/" + nombreArchivo + "?access_token=" + token.id, options)
      .toPromise()
      .then((response: any) => {
        var blob = new Blob([(<any>response)._body], { type: 'application/pdf' });
        let fileBlob = response.blob();
        return blob;

      })
      .catch(this.handleError);
  }



  addCountVisita(tipoDocumento: string, idElemento: number, idVisita: number, numVisitas: number): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));

    if(idVisita == 0)
    {
        let fecha = new Date();
        let anio = fecha.getFullYear();
        let mes = fecha.getMonth() + 1;
        let dataTemp = {};

        if(tipoDocumento == 'Documentos') {
            dataTemp = {
              idDocumento: idElemento,
              anio: anio,
              mes: mes,
              numVisitas: numVisitas
            };
        }
        else
        {
            dataTemp = {
              idVideo: idElemento,
              anio: anio,
              mes: mes,
              numVisitas: numVisitas
            };          
        }

        return this.http
          .post(environment.apiUrl + 'Visitas' + tipoDocumento + '?access_token=' + token.id, JSON.stringify(dataTemp), { headers: new Headers({ 'Content-Type': 'application/json' }) })
          .map((response: Response) => {
            return response;
          })
          .catch(this.handleError);
    }
    else
    {
        let dataTemp = {
          numVisitas: numVisitas
        };

        return this.http
          .patch(environment.apiUrl + 'Visitas' + tipoDocumento + '/' + idVisita + '?access_token=' + token.id, JSON.stringify(dataTemp), { headers: new Headers({ 'Content-Type': 'application/json' }) })
          .map((response: Response) => {
            return response;
          })
          .catch(this.handleError);

    }

  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
