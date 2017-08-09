import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioDataService } from '../_services/usuario-data.service'

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    public usuarioDataService: UsuarioDataService, public router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.usuarioDataService.existUsuario()) {
        return true;
    } else {
        this.router.navigate(['login']);
        return false;
    }
  }
}
