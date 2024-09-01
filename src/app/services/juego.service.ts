import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Juego } from '../models/juego.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  public juego?: Juego;

  constructor( private http: HttpClient) { }

  getJuegos() {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/juego`, {
      headers: {
        'x-token': token
      }
    });

  }

  crearJuego(req: any){
    const token = localStorage.getItem('token') || '';

    return this.http.post(`${ base_url }/juego`, req, {
      headers:{
        'x-token': token
      }
    });
  }

  subirImagen( req: any, id: string) {
    const token = localStorage.getItem('token') || '';

    return this.http.put(`${ base_url }/upload/juego/${ id }`, req, {
      headers: {
        'x-token': token
      }
    })
  }

  getImagenMontable(img: string) {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/upload/juego/${ img }`,{
      headers: {
        'x-token': token
      }
    });
  }
}
