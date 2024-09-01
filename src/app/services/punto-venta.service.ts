import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PuntoVentaService {

  constructor( private http: HttpClient) { }

  getPuntosVenta(){
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/punto_venta`, {
      headers: {
        'x-token': token
      }
    });
  }
}
