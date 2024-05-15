import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Clientes } from '../../Models/Entities.model';
import { SFacturasService } from '../../services/sfacturas.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrl: './buscar-cliente.component.scss'
})
export class BuscarClienteComponent implements OnInit{
  constructor(public sFacturas:SFacturasService){}
  ngOnInit(): void {
    this.sFacturas.retornarClientes()
    .subscribe(
      clientesRetornados=>{
        this.listaFiltradaClientes=clientesRetornados
      }
    )
  }
  
  @Output() cerrar = new EventEmitter<boolean>();
  @Output() clienteFacturar = new EventEmitter<Clientes>();
  clienteSeleccionado?:Clientes;
  seleccionBuscar: string = '1';
  listaFiltradaClientes: Clientes[] = [];
  filtro:string=''

  EnviarCliente(cliente: Clientes) {
    this.clienteFacturar.emit(cliente);
  }

  BuscarClientes() {
    switch (this.seleccionBuscar) {
      case '1':
      this.sFacturas.retornarClientes()
      .subscribe(
        clientesRetornados=>{
          this.listaFiltradaClientes=clientesRetornados.filter(x=>x.Id_Cli==parseInt(this.filtro))
        },
        error=>{
          alert('Por favor revise que los datos ingresados sean los correctos');
          console.log(error)
        }
      )
        break;
      case '2':
        this.sFacturas.retornarClientes()
        .subscribe(
          clientesRetornados=>{
            this.listaFiltradaClientes=clientesRetornados.filter(x=>x.Nombre==this.filtro)
          },
          error=>{
            alert('Por favor revise que los datos ingresados sean los correctos');
            console.log(error)
          }
        )
        break;
      case '3':
        this.sFacturas.retornarClientes()
      .subscribe(
        clientesRetornados=>{
          this.listaFiltradaClientes=clientesRetornados.filter(x=>x.Apellido==this.filtro)
        },
        error=>{
          alert('Por favor revise que los datos ingresados sean los correctos');
          console.log(error)
        }
      )
        break;
      case '4':
        this.sFacturas.retornarClientes()
        .subscribe(
          clientesRetornados=>{
            this.listaFiltradaClientes=clientesRetornados.filter(x=>x.Cedula==this.filtro)
          },
          error=>{
            alert('Por favor revise que los datos ingresados sean los correctos');
            console.log(error)
          }
        )
        break;
      case '5':
        this.sFacturas.retornarClientes()
      .subscribe(
        clientesRetornados=>{
          this.listaFiltradaClientes=clientesRetornados.filter(x=>x.Ciudad==this.filtro)
        },
        error=>{
          alert('Por favor revise que los datos ingresados sean los correctos');
          console.log(error)
        }
      )
        break;
      case '6':
        this.sFacturas.retornarClientes()
        .subscribe(
          clientesRetornados=>{
            this.listaFiltradaClientes=clientesRetornados.filter(x=>x.Telefono==this.filtro)
          },
          error=>{
            alert('Por favor revise que los datos ingresados sean los correctos');
            console.log(error)
          }
        )
        break;
      default:

        break;
    }
  }
  AceptarCliente(){
    if (this.clienteSeleccionado) {
      this.EnviarCliente(this.clienteSeleccionado)
      this.cerrar.emit(false);
    }else{
      alert('Por favor debe seleccionar un cliente');
    }
  }
}
