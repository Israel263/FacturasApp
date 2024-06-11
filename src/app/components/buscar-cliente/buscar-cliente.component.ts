import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Clientes } from '../../Models/Entities.model';
import { SFacturasService } from '../../services/sfacturas.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrl: './buscar-cliente.component.scss'
})
export class BuscarClienteComponent implements OnInit {
  constructor(public sFacturas: SFacturasService) { }
  ngOnInit(): void {
    this.sFacturas.retornarClientes()
      .subscribe(
        clientesRetornados => {
          this.listaCompletaClientes = clientesRetornados
          this.listaFiltradaClientes = this.listaCompletaClientes
        }
      )
  }

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() clienteFacturar = new EventEmitter<Clientes>();
  clienteSeleccionado?: Clientes;
  seleccionBuscar: string = '1';
  listaCompletaClientes: Clientes[] = []
  listaFiltradaClientes: Clientes[] = [];
  filtro: string = ''
  buscarPorId:boolean=false
  p: number = 1;

  EnviarCliente(cliente: Clientes) {
    this.clienteFacturar.emit(cliente);
  }

  BuscarClientes() {    
    if (this.buscarPorId) {
      this.listaFiltradaClientes = this.listaCompletaClientes.filter(x => x.Id_Cli==parseInt(this.filtro))
    }else{
      this.listaFiltradaClientes = this.listaCompletaClientes.filter( 
      x=>x.Nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      x.Id_Cli==parseInt(this.filtro) ||
      x.Apellido.toLowerCase().includes(this.filtro.toLowerCase()) || 
      x.Cedula.includes(this.filtro) || x.Ciudad.toLowerCase().includes(this.filtro.toLowerCase()) || 
      x.Telefono.includes(this.filtro))
    }
  }
  AceptarCliente() {
    if (this.clienteSeleccionado) {
      this.EnviarCliente(this.clienteSeleccionado)
      this.cerrar.emit(false);
    } else {
      alert('Por favor debe seleccionar un cliente');
    }
  }

  EliminarCliente(id_cli: number) {
    this.sFacturas.eliminarCliente(id_cli).subscribe(
      elimino => {
        if (elimino) {
          alert('Cliente eliminado con exito')
          this.ngOnInit();
        } else {
          alert('No se pudo eliminar al cliente porque esta referenciado en una factura')
        }
      },
      error => {
        console.log(error)
        alert('Ocurrio un prblema inesperado')
      }
    )
  }
}
