import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  @Output() collapsedHeader = new EventEmitter<boolean>();
  @Input() collapsedDefault? = false;

  constructor( private usuarioService: UsuarioService,
                private router: Router ){}

  logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  emitCollapsedHeader() {
    this.collapsedHeader.emit(!this.collapsedDefault);
  }
}
