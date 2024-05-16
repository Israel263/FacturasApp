import { Component, OnInit } from '@angular/core';
import { SFacturasService } from '../../services/sfacturas.service';
import { Clientes, DetFacturas, Facturas } from '../../Models/Entities.model';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit {

  constructor(private sFactura: SFacturasService) { };
  ngOnInit(): void {
    this.sFactura.retornarFactura(this.id_factura).subscribe(
      facturaRecibida => {
        this.factura = facturaRecibida
        this.ObtenerCliente(this.factura.Id_Cli_Per)
      }
    )
    this.obtenerDetalleFacturas(this.id_factura);
  }

  //TODO: pasar el id de home
  id_factura: number = 0
  factura?: Facturas
  cliente?: Clientes
  detFactura: DetFacturas[] = []

  ObtenerCliente(id_cli: number) {
    this.sFactura.retornarClientes().subscribe(
      clientesRetornados => {
        this.cliente = clientesRetornados.find(x => x.Id_Cli == id_cli)
      }
    )
  }

  obtenerDetalleFacturas(id_Factura: number) {
    this.sFactura.retornarDetalles(id_Factura).subscribe(
      detallesRetornados => {
        this.detFactura = detallesRetornados
      }
    )
  }

  obtenerProducto(Id_Pro: number, buscaNombre:boolean) {
    var nombreProducto: string | undefined
    var precioProducto:number|undefined
    this.sFactura.retornarProductos().subscribe(
      productoRetornado => {
        nombreProducto = productoRetornado.find(x => x.Id_Pro == Id_Pro)?.Nombre;
        precioProducto = productoRetornado.find(x => x.Id_Pro == Id_Pro)?.Precio;
        if (buscaNombre) {
          return nombreProducto != undefined ? nombreProducto : 'Not Found';          
        }else{
          return precioProducto != undefined ? precioProducto : -1;
        }
      },
      error=>{
        console.log(error)
        //TODO: Arreglar ver lógica
        return -2
      }
    )
  }


}
