import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    MatToolbarModule,
    HeaderComponent,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'Kidson Pay';
  collapsedSidebar: boolean = false;

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  receiveCollapsed(collapsedHeader: boolean) {
    this.collapsedSidebar = collapsedHeader;
    console.log("Recibido: " + collapsedHeader + ", Asignado: " + this.collapsedSidebar);
  }
  
}
