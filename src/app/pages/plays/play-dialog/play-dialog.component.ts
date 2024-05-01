import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-play-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  ],
  templateUrl: './play-dialog.component.html',
  styleUrl: './play-dialog.component.css'
})
export class PlayDialogComponent {

  constructor(public dialogRef: MatDialogRef<PlayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
