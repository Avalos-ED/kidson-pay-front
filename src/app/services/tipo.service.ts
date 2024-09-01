import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor( private http: HttpClient ) { }

  getTipos() {
    const token = localStorage.getItem('token') || '';
    
    return this.http.get(`${ base_url }/tipo`,{
      headers: {
        'x-token': token
      }
    });
  }
}
