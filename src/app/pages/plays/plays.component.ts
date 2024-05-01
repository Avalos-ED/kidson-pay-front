import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';
import { PlayDialogComponent } from './play-dialog/play-dialog.component';

@Component({
  selector: 'app-plays',
  standalone: true,
  imports: [ 
    MatCardModule, 
    MatIconModule, 
    MatTooltipModule, 
    MatButtonModule,
    PlayDialogComponent
  ],
  templateUrl: './plays.component.html',
  styleUrl: './plays.component.css'
})
export class PlaysComponent {

  animal?: string;
  name?: string;

  constructor( public dialog: MatDialog){}

  openDialog(): void {
    const dialogRef = this.dialog.open(PlayDialogComponent, {
      height: '80%',
      width: '65%',
      panelClass: "dialog-panel",
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
