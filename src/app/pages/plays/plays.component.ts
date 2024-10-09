import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PlayDialogComponent } from './play-dialog/play-dialog.component';
import { JuegoService } from '../../services/juego.service';
import { CommonModule } from '@angular/common';
import { Juego } from '../../models/juego.model';

@Component({
  selector: 'app-plays',
  standalone: true,
  imports: [ 
    MatCardModule, 
    MatIconModule, 
    MatTooltipModule, 
    MatButtonModule,
    MatTableModule,
    CommonModule,
    PlayDialogComponent,
    MatCheckboxModule
  ],
  templateUrl: './plays.component.html',
  styleUrl: './plays.component.css'
})
export class PlaysComponent implements OnInit {

  displayedColumns: string[] = ['Acción','Consecutivo', 'Denominación', 'Credito Inicial', 'Número Serie','Inmovilizado',
    'Valor Adquisición','Vida Util','Proveedor','Pais Origen'];
  columnsToDisplay: string[] = ['Accion','consecutivo', 'denominacion', 'creditoInicial', 'numeroSerie','inmovilizado',
    'valorAdquisicion','vidaUtil','proveedor','paisOrigen'];
  dataSource?: any;

  constructor( public dialog: MatDialog,
    private juegoService: JuegoService
  ){}

  ngOnInit(): void {
    this.getJuegos();
  }

  openDialog( element: any): void {
    const dialogRef = this.dialog.open(PlayDialogComponent, {
      height: '80%',
      width: '65%',
      panelClass: "dialog-panel",
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("Result: ", result);
      if ( result !== undefined) {
        this.getJuegos();
      }
    });
  }

  deleteJuego(element: Juego) {
    const id: string = element._id!;
    console.log("Eliminar Juego", element._id);
    this.juegoService.eliminarJuego(id)
        .subscribe({
          next: (resp:any) => {
            console.log("Resp: ", resp);
            this.getJuegos();
            Swal.fire('Kidson Play',resp.msg);
          },
          error: (error) => {
            Swal.fire('Error', error.error.msg, 'error');
          }
        })
  }

  getJuegos() {
    this.juegoService.getJuegos()
        .subscribe({
          next: (resp: any) => {
            this.dataSource = resp.juego;
            console.log('Resp: ', this.dataSource);
          },
          error: (error) => {
            Swal.fire('Error', error.error.msg, 'error');
          }
        });
  }

}
