import { Component, OnInit } from '@angular/core';
import { SFacturasService } from '../../services/sfacturas.service';
import { FacturaVista, Orden } from '../../Models/Entities.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-facturas',
  templateUrl: './ver-facturas.component.html',
  styleUrl: './ver-facturas.component.css'
})
export class VerFacturasComponent implements OnInit {
  constructor(private sFacturas: SFacturasService, public rutar: Router) { }

  listaFacturas: FacturaVista[] = [];
  facturasFiltradas: FacturaVista[] = []
  seleccionBuscar: string = '1';
  filtro: string = '';
  tieneFiltro: boolean = false;
  p:number=1

  ngOnInit(): void {
    this.sFacturas.listarOrdenes().subscribe(
      facturasDevueltas => {
        facturasDevueltas.forEach(
          fac => {
            this.insertarFactura(fac);                        
          }
        )
        this.listaFacturas=this.listaFacturas.reverse()
        this.facturasFiltradas=this.listaFacturas
      }
    )
  }

  insertarFactura(fac: Orden) {
    this.sFacturas.retornarUsuarios().subscribe(
      clientes => {
        var nombreCliente = clientes.find(x => x.usuarioID == fac.clienteID)?.nombre + ' ' + clientes.find(x => x.usuarioID == fac.clienteID)?.apellido          
        this.listaFacturas.push(new FacturaVista(fac.ordenID, fac.fechaVenta.toDateString(), nombreCliente, fac.totalVenta))
      }
    )
  }

  BuscarFacturas() {
    try {
      switch (this.seleccionBuscar) {
        case '1':
          this.facturasFiltradas = this.listaFacturas.filter(x => x.Id_Fac == parseInt(this.filtro));
          break;
        case '2':
          this.facturasFiltradas = this.listaFacturas.filter(x => x.Fecha == this.filtro);
          break;
        case '3':
          this.facturasFiltradas = this.listaFacturas.filter(x => x.Cliente.toLowerCase().includes(this.filtro.toLowerCase()));
          break;
        case '4':
          this.facturasFiltradas = this.listaFacturas.filter(x => x.Monto >= parseFloat(this.filtro));
          break;
        case '5':
          this.facturasFiltradas = this.listaFacturas.filter(x => x.Monto <= parseFloat(this.filtro));
          break;
      }      
      this.tieneFiltro = true;
    } catch (error) {
      alert('Por favor inserte los datos en el formato correcto.');
    }
  }
  borrarFiltros() {
    this.tieneFiltro = false;
    this.facturasFiltradas = this.listaFacturas
  }
  convertirFecha(fecha: string): string {    
    var fechaString = fecha;
    var matchResult = fechaString.match(/\d+/);

    if (matchResult) {
      var fechaMilisegundos = parseInt(matchResult[0], 10);  // Extraer milisegundos
      var fechaConvertida = new Date(fechaMilisegundos);
      return `${fechaConvertida.getDate()}/${fechaConvertida.getMonth() + 1}/${fechaConvertida.getFullYear()}`;
    } else {
      return 'fechaError'
    }
  }

  eliminarFactura(id_fac:number){
    // this.sFacturas.EliminarFactura(id_fac).subscribe(
    //   elimino=>{
    //     if (elimino) {
    //       alert('Factura eliminada con exito')          
    //     }else{
    //       alert('No se ha podido eliminar la factura')
    //     }
    //   },
    //   error=>{
    //     alert('Ha ocurrido un error inesperado')
    //     console.log(error)
    //   }
    // )
  }

}
