import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
 constructor(public ruta:Router, private authService:AuthService){}


 login(form:NgForm){
  const usuario= form.value.usuario;
  const contraseña= form.value.contraseña;

  this.authService.login(usuario,contraseña);
  
 }
}
