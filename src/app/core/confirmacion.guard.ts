import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute                } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

@Injectable()
export class ConfirmacionGuard implements CanActivate {

  constructor(
    public router: Router,
    private route: ActivatedRoute
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(localStorage.getItem('registro'));
    if(localStorage.getItem('registro') == 'regok')
    {
      localStorage.removeItem('registro');
      return true;
    }
    else
    {
      localStorage.removeItem('registro');
      this.router.navigate(['login']);
      return false;
    }
  }

}
