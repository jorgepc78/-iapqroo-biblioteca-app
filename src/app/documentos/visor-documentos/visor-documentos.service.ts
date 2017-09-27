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

  getNombrePDF(tipo: string, id: number): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let campos: any = [];

    if(tipo == 'Libros')
      campos = ["idLibro","nombreArchivo", "nombre"];
    else if(tipo == 'Revistas')
      campos = ["idRevista","nombreArchivo", "nombre"];
    else if(tipo == 'Publicaciones')
      campos = ["idPublicacion","nombreArchivo", "nombre"];
    else if(tipo == 'Presentaciones')
      campos = ["idPresentacion","nombreArchivo", "nombre"];

    let fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;

    let filter = {
      fields: campos,
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

    return this.http
      .get(environment.apiUrl + tipo + '/' + id + '?filter=' + JSON.stringify(filter) + '&access_token=' + token.id, { headers: this.headers })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


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



  addCountVista(tipo: string, idVista: number, idDocumento: number, numVistas: number): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));

    if(idVista == 0)
    {
        let fecha = new Date();
        let anio = fecha.getFullYear();
        let mes = fecha.getMonth() + 1;
        let dataTemp = {};

        if(tipo == 'Libros') {
            dataTemp = {
              idLibro: idDocumento,
              anio: anio,
              mes: mes,
              numVistas: numVistas
            };
        }
        else if(tipo == 'Revistas') {
            dataTemp = {
              idRevista: idDocumento,
              anio: anio,
              mes: mes,
              numVistas: numVistas
            };
        }
        else if(tipo == 'Publicaciones') {
            dataTemp = {
              idPublicacion: idDocumento,
              anio: anio,
              mes: mes,
              numVistas: numVistas
            };
        }
        else if(tipo == 'Presentaciones') {
            dataTemp = {
              idPresentacion: idDocumento,
              anio: anio,
              mes: mes,
              numVistas: numVistas
            };
        }

        return this.http
          .post(environment.apiUrl + tipo + 'Vistas?access_token=' + token.id, JSON.stringify(dataTemp), { headers: new Headers({ 'Content-Type': 'application/json' }) })
          .map((response: Response) => {
            return response;
          })
          .catch(this.handleError);
    }
    else
    {
        let dataTemp = {
          numVistas: numVistas
        };

        return this.http
          .patch(environment.apiUrl + tipo + 'Vistas/' + idVista + '?access_token=' + token.id, JSON.stringify(dataTemp), { headers: new Headers({ 'Content-Type': 'application/json' }) })
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
