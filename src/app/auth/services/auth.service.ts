import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined; // Permite almacenar el valor de la autenticación.

  get auth(): Auth {
    return {...this._auth!}
  }

  constructor(private http:HttpClient) { }

  verificaAutenticacion(): Observable<boolean>{
    if( !localStorage.getItem('id') ){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map( auth => {
          console.log('map', auth);
          this._auth = auth;
          return true;
        })
      );
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        // Permite generar un evento secundario, antes de llegar al subscribe.
        // tap(resp => console.log('AUTHSERVICE', resp))
        tap( auth => this._auth = auth),
        tap( auth => localStorage.setItem('id', auth.id) )
      );
  }

}
