import { Component, OnInit } from '@angular/core';
import { SFacturasService } from '../../services/sfacturas.service';
import { Usuarios, DetOrdenes, Orden, Productos, ProductosOrden } from '../../Models/Entities.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit {

  constructor(private sFactura: SFacturasService, private routeActivated: ActivatedRoute) {
    this.routeActivated.params.subscribe(param => {
      this.id_factura = param['id']
    })
  };

  id_factura: number = 0
  factura?: Orden
  cliente?: Usuarios
  detFactura: ProductosOrden[] = []
  listaProductos: Productos[] = []

  ngOnInit(): void {
    this.sFactura.retornarFactura(this.id_factura).subscribe(
      respuesta => {
        if (respuesta.esCorrecto) {
          this.factura = <Orden>respuesta.valor
          this.ObtenerCliente(this.factura.clienteID)
          this.obtenerDetalleFacturas(this.id_factura);
        } else {
          console.log(respuesta.mensaje)
        }

      }
    )
  }


  ObtenerCliente(id_cli: number) {
    this.sFactura.retornarUsuarios().subscribe(
      respuesta => {
        if (respuesta.esCorrecto) {
          this.cliente = Object.values(respuesta.valor).find(x => x.usuarioID == id_cli)
        } else {
          console.log(respuesta.mensaje)
        }
      }
    )
  }

  obtenerDetalleFacturas(id_Factura: number) {
    this.sFactura.retornarDetalles(id_Factura).subscribe(
      respuesta => {
        if (respuesta.esCorrecto) {
        Object.values(respuesta.valor).forEach(
            detalle=>{            
              this.detFactura.push(new ProductosOrden(detalle.productoID,'',0,0,detalle.cantidad, detalle.subtotal))
            }          
          )
          this.obtenerProducto()  
        }else{
          console.log(respuesta.mensaje)
        }
        
      }
    )
  }

  obtenerProducto() {
    this.sFactura.retornarProductos().subscribe(
      respuesta => {
        if (respuesta.esCorrecto) {
          this.listaProductos = Object.values(respuesta.valor)
          this.asignarDatosProductos();
        } else {
          console.log(respuesta.mensaje);
        }
      }
    )
  }

  asignarDatosProductos() {
    this.detFactura.forEach(
      detalleFac => {
        var indice = this.listaProductos.findIndex(x => x.idProducto == detalleFac.Id_Pro)
        detalleFac.Nombre = this.listaProductos[indice].nombre
        detalleFac.Precio = this.listaProductos[indice].precio
        detalleFac.Stock = this.listaProductos[indice].stock
      }
    )
  }

  convertirFecha(fecha: string): string {
    var fechaString = fecha;
    var matchResult = fechaString.match(/\d+/);

    if (matchResult) {
      var fechaMilisegundos = parseInt(matchResult[0], 10);
      var fechaConvertida = new Date(fechaMilisegundos);
      return `${fechaConvertida.getDate()}/${fechaConvertida.getMonth() + 1}/${fechaConvertida.getFullYear()}`;
    } else {
      return 'fechaError'
    }
  }


}
