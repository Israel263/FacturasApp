import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

  title = 'ClienteFacturas';
  constructor(private authService:AuthService){}
  estaLogueado(){
    return this.authService.estaLogeado();
  }
  cerrarSesion(){
    this.authService.cerrarSesion();
  }
}
