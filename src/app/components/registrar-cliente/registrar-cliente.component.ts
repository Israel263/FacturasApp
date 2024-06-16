import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from '../../Models/Entities.model';
import { SFacturasService } from '../../services/sfacturas.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.scss'
})
export class RegistrarClienteComponent {

  constructor(public rutar: Router, private sFacturas: SFacturasService, private auth: AuthService) { }
  clienteCrear: Usuarios = new Usuarios(0, '', '', '', '', '', new Date(Date.now.toString()), '', '', 3)

  CrearCliente() {
    const regexNumeros = /^\d+$/;
    const regexLetras = /^[A-Za-z]+$/;
    if (!regexNumeros.test(this.clienteCrear.cedula) && !regexNumeros.test(this.clienteCrear.telefono)) {
      alert('Verifique que los campos cedula y telefono solo contengan números.')
    } else if (!regexLetras.test(this.clienteCrear.nombre) && !regexLetras.test(this.clienteCrear.direccion) && !regexLetras.test(this.clienteCrear.apellido)) {
      alert('Verifique que los campos ciudad, nombre, y apellido solo contengan letras.')
    } else { 
      this.sFacturas.crearUsuario(this.clienteCrear).subscribe(
        cli => {
            if(cli.esCorrecto){
              this.auth.register(this.clienteCrear.Email, this.clienteCrear.Password)
              .then(respuesta => {
                respuesta.user.getIdToken().then(
                  token=>{
                    this.clienteCrear.usuarioID=parseInt(cli.valor.toString());
                    this.sFacturas.crearUsuarioFirebase(this.clienteCrear, token).subscribe(
                      respuesta => {
                        alert('Se ha creado correctamente el cliente')
                        this.rutar.navigateByUrl('/login')
                        console.log('La inserccion fue correcta en firebase de usuarios', respuesta)
                      },
                      error => {
                        alert('Ha ocurrido un error');
                        console.log('La inserccion fue erronea en firebase de usuarios', error)
                      }
                    )
                  });
                  }
                );          
            }else{
              alert('No se ha creado el usuario');
            }    
        },
        error => {
          alert('No se ha podido crear el cliente (servidor)')
          console.log(error)
        }
      )
    }
  }
}
