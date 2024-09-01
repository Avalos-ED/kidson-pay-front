import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor( private http: HttpClient ) { }

  getEstados() {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/estado`, {
      headers: {
        'x-token': token,
      }
    });
  }
}
