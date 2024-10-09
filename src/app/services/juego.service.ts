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

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  getJuegos() {
    return this.http.get(`${ base_url }/juego`, {
      headers: {
        'x-token': this.token
      }
    });

  }

  crearJuego(req: any){
    return this.http.post(`${ base_url }/juego`, req, {
      headers:{
        'x-token': this.token
      }
    });
  }

  actualizarJuego(req: any, id: string){
    return this.http.put(`${ base_url }/juego/${ id }`, req, {
      headers:{
        'x-token': this.token
      }
    });
  }

  eliminarJuego(id: string){
    return this.http.delete(`${ base_url }/juego/${ id }`, {
      headers:{
        'x-token': this.token
      }
    });
  }

}
