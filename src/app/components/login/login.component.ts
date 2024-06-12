import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
 constructor(public ruta:Router, private loginService:LoginService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

 login(form:NgForm){
  const usuario= form.value.usuario;
  const contraseña= form.value.contraseña;

  this.loginService.login(usuario,contraseña);
  
 }
}
