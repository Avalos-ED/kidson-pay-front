import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    MatToolbarModule,
    HeaderComponent,
    SidebarComponent,
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent implements OnInit {

  title = 'Kidson Play';
  collapsedSidebar: boolean = false;

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  receiveCollapsed(collapsedHeader: boolean) {
    this.collapsedSidebar = collapsedHeader;
    console.log("Recibido: " + collapsedHeader + ", Asignado: " + this.collapsedSidebar);
  }
}
