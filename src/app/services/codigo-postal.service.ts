import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CodigoPostalService {

  constructor( private http: HttpClient ) { }

  getCentroCostoByCP(cp: string) {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/codigo_postal/${ cp }`, {
      headers: {
        'x-token': token
      }
    });
  }

}
