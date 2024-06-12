import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from '../../Models/Entities.model';
import { SFacturasService } from '../../services/sfacturas.service';
import { error } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.scss'
})
export class RegistrarClienteComponent {

  constructor(public rutar: Router, private sFacturas: SFacturasService) { }
  clienteCrear: Usuarios = new Usuarios(0, '', '', '', '', '', new Date(Date.now.toString()), 3)

  CrearCliente() {
    const regexNumeros = /^\d+$/;
    const regexLetras = /^[A-Za-z]+$/;
    if (!regexNumeros.test(this.clienteCrear.cedula) && !regexNumeros.test(this.clienteCrear.telefono)) {
      alert('Verifique que los campos cedula y telefono solo contengan números.')
    } else if(!regexLetras.test(this.clienteCrear.nombre) && !regexLetras.test(this.clienteCrear.direccion) && !regexLetras.test(this.clienteCrear.apellido)){
      alert('Verifique que los campos ciudad, nombre, y apellido solo contengan letras.')
    }else {
      this.sFacturas.crearUsuarioFirebase(this.clienteCrear).subscribe(
        respuesta=>{
          alert('Se ha creado correctamente el cliente')
          this.rutar.navigateByUrl('/login')
          console.log('La inserccion fue correcta en firebase de usuarios',respuesta)},
        error=>{
          alert('Ha ocurrido un error');
          console.log('La inserccion fue erronea en firebase de usuarios',error)}
      )
      // this.sFacturas.crearUsuario(this.clienteCrear).subscribe(
      //   cli => {
      //     if (cli) {
      //       alert('Se ha creado correctamente el cliente')
      //       this.rutar.navigateByUrl('/login')
      //     } else {
      //       alert('No se ha podido crear el cliente, por favor ingrese los datos en el formato correcto')
      //     }
      //   },
      //   error => {
      //     alert('No se ha podido crear el cliente (servidor)')
      //     console.log(error)
      //   }
      // )
    }
  }
}
