import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app'
import { LoginService } from './components/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'ClienteFacturas';
  constructor(private loginService:LoginService){}
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyAcC99oteb87cRnrNs11aRI_EUOLIWrFzE",
      authDomain: "facturacion-app-5ae81.firebaseapp.com"
    });
  }
  estaLogueado(){
    return this.loginService.estaLogeado();
  }
  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}
