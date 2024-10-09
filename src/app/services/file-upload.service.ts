import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  async actualizarArchivo(
    archivo: File,
    tipo: string,
    id: string,
    tipoArchivo: string,
  ) {

    try {
      const url = `${ base_url }/upload/${ tipo }/${ tipoArchivo }/${ id }`;

      const formData = new FormData();
      formData.append('archivo', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      } );

      const data = await resp.json();
      console.log(data);
      
      return 'nombre de la imagen'

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getArchivo(archivo: string){
    return this.http.get(`${ base_url }/upload/juego/${ archivo }`, {
      headers:{
        'x-token': this.token
      },
      responseType: 'blob' as 'json'
    });
  }

}
