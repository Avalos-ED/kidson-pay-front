import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import Swal from 'sweetalert2';

import { TipoService } from '../../../services/tipo.service';
import { PuntoVentaService } from '../../../services/punto-venta.service';
import { EstadoService } from '../../../services/estado.service';
import { Token } from '../../../interfaces/token.interfaces';
import { CentroCostoService } from '../../../services/centro-costo.service';
import { CentroCosto } from '../../../interfaces/centroCosto.interfaces';
import { CodigoPostalService } from '../../../services/codigo-postal.service';
import { CodigoPostal } from '../../../interfaces/codigoPostal.interfaces';
import { JuegoService } from '../../../services/juego.service';
import { DatePipe, formatDate } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Juego } from '../../../models/juego.model';
import { environment } from '../../../../environments/environment';
import { Estado } from '../../../models/estado.model';
import { Tipo } from '../../../models/tipo.model';
import { PuntoVenta } from '../../../models/puntoVenta.model';
import { CentroCosto as CentroCostoM  } from '../../../models/centroCosto.model';
import { CodigoPostal as CodigoPostalM } from '../../../models/codigoPostal.model';

const base_url = environment.base_url;

@Component({
  selector: 'app-play-dialog',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  imports: [
    MatDialogContent,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogActions,
    MatDialogClose,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './play-dialog.component.html',
  styleUrl: './play-dialog.component.css'
})
export class PlayDialogComponent implements OnInit {

  public juego    = new Juego();
  public estadoM  = new Estado();
  public tipoM    = new Tipo();
  public puntoVentaM = new PuntoVenta();
  public centroCostoM = new CentroCostoM();
  public codigoPostalM = new CodigoPostalM();

  estadoJuego?: string;
  tipoJuego?: string;
  puntoVentaJuego?: string;
  fechaAlta?: Date;
  fecha?: Date;
  centroCosto?: string;

  tokens: Token[] = [
    {opc: 'opc1', numero: '1'},
    {opc: 'opc2', numero: '2'},
    {opc: 'opc3', numero: '3'},
    {opc: 'opc4', numero: '4'},
  ];
  tipos?: any;
  puntosVenta: any;
  estados: any;
  centrosCosto: any;
  codigosPostal: any;

  consecutivo?: string;
  centroBeneficio?: string;
  cPostal?: string;
  cEstado?: string;
  tipoAsenta?: string;
  estado?: string;
  ciudad?: string;
  municipio?: string;
  dTipoAsenta?: string;
  public imgUrl?: string;

  constructor(public dialogRef: MatDialogRef<PlayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Juego,
    private tipoService: TipoService,
    private puntoVentaService: PuntoVentaService,
    private estadoService: EstadoService,
    private centroCostosService: CentroCostoService,
    private codigoPostalService: CodigoPostalService,
    private juegoService: JuegoService,
    ){
    }

  ngOnInit(): void {
    
    if(this.data){
      console.log("Elemento:", this.data);
      this.consecutivo = this.data.consecutivo;
      this.estadoM = this.data.estado as Estado;
      this.tipoM = this.data.tipo as Tipo;
      this.puntoVentaM = this.data.puntoVenta as PuntoVenta;
      this.centroCostoM = this.data.centroCosto as CentroCostoM;
      this.codigoPostalM = this.data.codigoPostal as CodigoPostalM;
      this.cPostal = this.codigoPostalM.d_codigo;
      console.log("Cdigo postal: ", this.codigoPostalM);
      this.getCodigoPosta();
      this.juego = this.data;
      this.estadoJuego = this.estadoM._id;
      this.tipoJuego = this.tipoM._id;
      this.puntoVentaJuego = this.puntoVentaM._id;
      let fechaSpl = this.data.fechaAlta?.split('-') || '';
      let fechaCast = new Date(Number(fechaSpl[2]), Number(fechaSpl[1]), Number(fechaSpl[0]));
      this.fechaAlta = fechaCast;
      fechaSpl = this.data.fecha?.split('-') || '';
      console.log("fecha split", fechaSpl);
      fechaCast = new Date(Number(fechaSpl[2]), Number(fechaSpl[1]), Number(fechaSpl[0]));
      this.fecha = fechaCast;
      this.juego.centroCosto = this.centroCostoM.centroCosto;
      this.centroBeneficio = this.centroCostoM.centroBeneficio;
      this.juego.codigoPostal = this.codigoPostalM._id;
      this.tipoAsenta = this.codigoPostalM.d_tipo_asenta;
    }
    this.imgUrl = `${ base_url }/upload/juego/no-image`;
    
    //Tipos
    this.tipoService.getTipos()
    .subscribe({
      next: ( resp: any) => {
        this.tipos = resp.tipo;
      },
      error: (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      }
    });

    //Punto de Venta
    this.puntoVentaService.getPuntosVenta()
      .subscribe({
        next: ( resp: any) => {
            this.puntosVenta = resp.puntoVenta;
        },
        error: (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      });

    //Estados
    this.estadoService.getEstados()
      .subscribe({
        next: ( resp: any ) => {
          this.estados = resp.estado;
        },
        error: ( error ) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      });

    //Centros de Costo
    this.centroCostosService.getCentrosCosto()
      .subscribe({
        next: ( resp: any ) => {
          this.centrosCosto = resp.centroCosto;
        },
        error: (error) => {
          Swal.fire('Error', error.error.msg, 'error');
            }
      });
  }

  searchFields(key: KeyboardEvent){
    if (key.code === 'Enter'){
      this.getCodigoPosta();
    }
  }

  getCodigoPosta() {
    //Codigo Postal
    this.codigoPostalService.getCentroCostoByCP(this.cPostal || '')
    .subscribe({
      next: (resp: any) => {
        this.codigosPostal = resp.codigoPostal;

        let estado: any = [...new Set(this.codigosPostal.map((item: any) => item.d_estado))][0];
        let ciudad: any = [...new Set(this.codigosPostal.map((item: any) => item.d_ciudad))][0];
        let municipio: any = [...new Set(this.codigosPostal.map((item: any) => item.d_mnpio))][0];
        let tipoAsenta: any = [...new Set(this.codigosPostal.map((item: any) => item.d_tipo_asenta))];
        let id: any = [...new Set(this.codigosPostal.map((item: any) => item.c_estado))];
        this.estado = estado;
        this.ciudad = ciudad;
        this.municipio = municipio;
        this.dTipoAsenta = tipoAsenta;
        this.cEstado = id;
        console.log('tipoAsenta', this.dTipoAsenta);
      },
      error: (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectCentroCo(centroBeneficio: string){
    console.log('CentroCosto: ', centroBeneficio);
    this.centroBeneficio = centroBeneficio;
    //this.juego.centroCosto = centroCosto._id;
  }

  save(){  
    
    //this.juego.token = this.juegoForm.get('tokenControl')?.value; //this.tokenControl.value == null ? '' : this.tokenControl.value;
    this.juego.fechaAlta = formatDate(this.juego.fechaAlta || '','dd-MM-yyyy',"en-US"),
    this.juego.fecha = formatDate(this.juego.fecha || '','dd-MM-yyyy',"en-US");
    //this.juego.codigoPostal = this.juegoForm.get('asentaControl')?.value; // this.asentaControl.value == null ? '' : this.asentaControl.value;
    //this.juego.estado = this.juegoForm.get('estadoControl')?.value; //this.estadoControl.value == null ? '' : this.estadoControl.value;
    //this.juego.puntoVenta = this.juegoForm.get('puntoVentaControl')?.value; //this.puntoVentaControl.value == null ? '' : this.puntoVentaControl.value;
    //this.juego.tipo = this.juegoForm.get('tipoControl')?.value; //this.tipoControl.value == null ? '' : this.tipoControl.value;
    
    console.log('Fecha Alta', this.fechaAlta);
    console.log('Req juego', this.juego);
    console.log('Guardar');
    /*this.juegoService.crearJuego(this.juego)
      .subscribe({
        next: (resp: any) => {
          console.log('Resp juego', resp);
        },
        error: (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      })*/
  }

  fileChanged(event: any){
    const files = event.target.files;
    if (files){
      console.log('Files', files);
      this.updateImagen(files, '6670d7082a66c9fe7c296ada');
      //this.fileChange.emit(files);
    } else {
      console.log('sin archivo');
      
      //this.fileChange.emit();
    }
  }

  updateImagen(imagen: any, id: string){
    console.log('imagen', imagen);
    console.log('id juego: ', id);
    
    this.juegoService.subirImagen(imagen, id )
      .subscribe({
        next: (resp: any) => {
          console.log('Resp update imagen', resp);
        },
        error: (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      })
  }
}
