import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Clientes } from '../../Models/Entities.model';
import { SFacturasService } from '../../services/sfacturas.service';
import { error } from 'console';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.scss'
})
export class RegistrarClienteComponent {

  constructor(public rutar: Router, private sFacturas: SFacturasService) { }
  clienteCrear: Clientes = new Clientes(0, '', '', '', '', '')

  CrearCliente() {
    const regexNumeros = /^\d+$/;
    const regexLetras = /^[A-Za-z]+$/;
    if (!regexNumeros.test(this.clienteCrear.Cedula) && !regexNumeros.test(this.clienteCrear.Telefono)) {
      alert('Verifique que los campos cedula y telefono solo contengan números.')
    } else if(!regexLetras.test(this.clienteCrear.Nombre) && !regexLetras.test(this.clienteCrear.Ciudad) && !regexLetras.test(this.clienteCrear.Apellido)){
      alert('Verifique que los campos ciudad, nombre, y apellido solo contengan letras.')
    }else {
      this.sFacturas.crearCliente(this.clienteCrear).subscribe(
        cli => {
          if (cli) {
            alert('Se ha creado correctamente el cliente')
            this.rutar.navigateByUrl('/login')
          } else {
            alert('No se ha podido crear el cliente, por favor ingrese los datos en el formato correcto')
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
