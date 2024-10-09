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
import { QrCodeModule } from 'ng-qrcode';

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
import { FileUploadService } from '../../../services/file-upload.service';
import { Usuario } from '../../../models/usuario.model';

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
    QrCodeModule,
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
  public usuario = new Usuario();
  public imagenSubir!: File;
  public documentoSubir!: File;
  fileName = '';

  linkQr!: string;

  estadoJuego?: string;
  tipoJuego?: string;
  puntoVentaJuego?: string;
  fechaAlta?: Date;
  fecha?: Date;
  centroCosto?: string;
  isDownload: boolean = true;

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

  centroCostoS = new CodigoPostalM();
  consecutivo?: string;
  centroBeneficio?: string;
  cPostal?: string;
  cEstado?: string;
  tipoAsenta?: string;
  estado?: string;
  ciudad?: string;
  municipio?: string;
  dTipoAsenta?: string;
  imgUrl!: string;
  archivoUrl!: string;

  constructor(public dialogRef: MatDialogRef<PlayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Juego,
    private tipoService: TipoService,
    private puntoVentaService: PuntoVentaService,
    private estadoService: EstadoService,
    private centroCostosService: CentroCostoService,
    private codigoPostalService: CodigoPostalService,
    private juegoService: JuegoService,
    private fileUpload: FileUploadService
    ){
    }

  ngOnInit(): void {
    this.linkQr= 'Prueba del qr';
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

      if(this.data){
        console.log("Elemento:", this.data);
        this.consecutivo = this.data.consecutivo;
        this.estadoM = this.data.estado as Estado;
        this.tipoM = this.data.tipo as Tipo;
        this.puntoVentaM = this.data.puntoVenta as PuntoVenta;
        this.centroCostoM = this.data.centroCosto as CentroCostoM;
        this.codigoPostalM = this.data.codigoPostal as CodigoPostalM;
        //this.usuario = this.data.usuario as Usuario;
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
        this.juego.centroCosto = this.centroCostoM._id;
        //this.centroCostoS._id = this.centroCostoM._id;
        this.centroBeneficio = this.centroCostoM.centroBeneficio;
        this.juego.codigoPostal = this.codigoPostalM._id;
        this.tipoAsenta = this.codigoPostalM.d_tipo_asenta;
        if (this.data.imgMontable !== ''){
          this.imgUrl = `${ base_url }/upload/juego/${this.data.imgMontable}`;
        } else {
          this.imgUrl = `${ base_url }/upload/juego/no-image`;
        }
        this.archivoUrl = this.data.documento!;
        this.isDownload = false;
      } else {
        this.imgUrl = `${ base_url }/upload/juego/no-image`;
        this.isDownload = true;
      }
      console.log("isDownload:", this.isDownload);
      
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

  selectCentroCo(id: string){
    console.log("Centro de Costos Select:", id);

    this.centrosCosto.filter((cc:any) => {
      if ( cc._id === id ){
        this.centroBeneficio = cc.centroBeneficio;
      }
    });
  }

  save(){  
    this.juego.puntoVenta = this.puntoVentaJuego;
    this.juego.tipo = this.tipoJuego;
    this.juego.estado = this.estadoJuego;
    delete this.juego.usuario;
    if(this.data) {
      console.log("Juego Editar: ", this.juego);
      //console.log("Usuario: ", this.usuario);
      this.juegoService.actualizarJuego(this.juego, this.juego._id || '')
        .subscribe({
          next: (resp: any) => {
            console.log('Resp juego', resp);
            const { ok, juego } = resp;
            const juegoResp = juego;
            console.log('juegoResp', juegoResp);
            if ( ok ){
              if (this.imagenSubir !== undefined) {
                console.log('juegoResp.id', juegoResp._id);
                this.updateFile( juegoResp._id, 'img');
              }
              if (this.documentoSubir !== undefined) {
                console.log('juegoResp.id', juegoResp._id);
                this.updateFile( juegoResp._id, 'doc');
              }
            }
            this.dialogRef.close(juegoResp);
          },
          error: (error) => {
            Swal.fire('Error', error.error.msg, 'error');
          }
        });
    } else {
      this.juego.fechaAlta = formatDate(this.fechaAlta || '','dd-MM-yyyy',"en-US"),
      this.juego.fecha = formatDate(this.fecha || '','dd-MM-yyyy',"en-US");
      this.juego.imgMontable = '';
      this.juego.documento = '';
      console.log('Fecha Alta', this.fechaAlta);
      console.log('Req juego', this.juego);
      console.log('Guardar');
  
      this.juegoService.crearJuego(this.juego)
        .subscribe({
          next: (resp: any) => {
            console.log('Resp juego', resp);
            const { ok, juego } = resp;
            const juegoResp = juego;
            console.log('juegoResp', juegoResp);
            if ( ok ){
              if (this.imagenSubir !== undefined) {
                console.log('juegoResp.id', juegoResp._id);
                this.updateFile( juegoResp._id, 'img');
              }
              if (this.documentoSubir !== undefined) {
                console.log('juegoResp.id', juegoResp._id);
                this.updateFile( juegoResp._id, 'doc');
              }
            }
            this.dialogRef.close(juegoResp);
          },
          error: (error) => {
            Swal.fire('Error', error.error.msg, 'error');
          }
        });
    }
  }

  fileChanged(event: any){
    this.imagenSubir = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imgUrl  = reader.result as any;
    }
    reader.readAsDataURL(this.imagenSubir);

  }

  updateFile(id: string, tipoArchivo: string){
    if( tipoArchivo === 'img') {
      this.fileUpload
      .actualizarArchivo(this.imagenSubir, 'juego', id, tipoArchivo)
      .then(img => console.log(img));
    } else if ( tipoArchivo === 'doc') {
      this.fileUpload
      .actualizarArchivo(this.documentoSubir, 'juego', id, tipoArchivo)
      .then(doc => console.log(doc));
    }
  }

  onFileSelected(event: any){
    this.documentoSubir = event.target.files[0];
    if(this.documentoSubir) {
      this.fileName = this.documentoSubir.name;
    }
  }

  downloadFile(){  
    if ( this.archivoUrl !== undefined && this.archivoUrl.length > 0) {
      const fileName = `doc_${ Math.random()}.pdf`;
      this.fileUpload.getArchivo(this.archivoUrl).subscribe( resp => {
        this.manageFile(resp, fileName);
        console.log("Documento descargado");
      });
    } else {
      Swal.fire("Kidson Play", "No existe docuemento adjuntado para este juego");
    }
  }

  manageFile(response: any, fileName: string):void {
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);

    const filePath = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
