import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient) { }

  logout() {
    localStorage.removeItem('token');
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      }),
      map( resp => true),
      catchError( error => of(false))
    )
  }

  login( formData: LoginForm ){
    return this.http.post(`${ base_url }/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem( 'token', resp.token );
                  })
                );
  }

}
