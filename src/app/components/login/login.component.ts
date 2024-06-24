import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { SFacturasService } from '../../services/sfacturas.service';
import { Usuarios } from '../../Models/Entities.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
 constructor(public ruta:Router, private authService:AuthService, private sFacturas:SFacturasService){}


 login(form:NgForm){
  const usuario= form.value.usuario;
  const contraseña= form.value.contraseña;
  this.sFacturas.retornarUsuarioPorEmail(usuario).subscribe(
    respuesta=>{
      if (respuesta.valor) {
        let user=respuesta.valor as Usuarios
        let contra=user.password
        if ( user.password==contraseña && (user.rolID==3 || user.rolID==1)) {
          this.authService.login(usuario,contraseña);
          SFacturasService.esAdmin=user.rolID==1?true:false;
          this.sFacturas.establecerAdmin(user.rolID==1?'true':'false')
        }else{
          alert('Contraseña Incorrecta')
        }
      }else{
        alert('Credenciales incorrectas')
        console.log(respuesta.mensaje)
      }
    },error=>{
      alert('Credenciales incorrecta(s)')
      console.log(error)
    }
  )
  
  
 }
}
