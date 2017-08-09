import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioDataService {

  constructor() { }

  setDatosUsuario(data:any) {
    return new Promise((resolve, reject) => {
      let cadena = btoa(JSON.stringify(data));
      localStorage.setItem('usuario', cadena);
      resolve({ estatus: 'ok' });
    });
  }

  getDatosUsuario() {
    return new Promise((resolve, reject) => {
      let data = atob(localStorage.getItem('usuario'));
      resolve(JSON.parse(data));
    });
  }

  eliminaUsuario() {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('usuario');
      resolve({ estatus: 'ok' });
    });
  }

  existUsuario() {
    if (localStorage.getItem('usuario'))
      return true;
    else
      return false;
  }

}
