import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Route, UrlSegment, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService:AuthService,
    private router: Router  
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.verificaAutenticacion()
        .pipe(
          tap( isAutenticado => {
            if(!isAutenticado) {
              this.router.navigate(['./auth/login']);
            }
          } )
        )
      // if(this.authService.auth.id){
      //   return true;
      // }      

      // console.log('Bloqueado por Can-Activated');
      // return false;
  }

  // Solo sirve para evitar que cargue el modulo, si esta previamente cargado lo va a visualizar.
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.verificaAutenticacion()
        .pipe(
          tap( isAutenticado => {
            if(!isAutenticado) {
              this.router.navigate(['./auth/login']);
            }
          } )
        )
      // if(this.AuthService.auth.id){
      //   return true;
      // }      

      // console.log('Bloqueado por el Can-Load');
      // return false;
    }
  
}
