import { Component, OnInit } from '@angular/core';
import { SFacturasService } from '../../services/sfacturas.service';
import { Clientes, Productos, ProductosOrden } from '../../Models/Entities.model';
import { Router } from '@angular/router';
import { BuscarClienteComponent } from '../buscar-cliente/buscar-cliente.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  listaProductos: Productos[] = []
  listaProductosOrden: ProductosOrden[] = [];
  total: number = 0;
  buscarClientes: boolean = false;
  buscarProductos: boolean = false;
  cliente?: Clientes;

  constructor(private sFacturas: SFacturasService, private ruta: Router) { }

  ngOnInit(): void {
    this.sFacturas.retornarProductos()
      .subscribe(
        productosRetornados => {
          this.listaProductos = productosRetornados.filter(x => x.Stock > 0);
        }
      )
  }
  actualizarOrdenVenta(evento: Event, id: number) {
    const inputElement = evento.target as HTMLInputElement;
    if (inputElement.checked) {
      this.listaProductos.filter(x => x.Seleccionado).forEach(producto => {
        if (!this.listaProductosOrden.find(x => x.Id_Pro == producto.Id_Pro)) {
          this.listaProductosOrden.push(new ProductosOrden(producto.Id_Pro, producto.Nombre, producto.Marca, producto.Precio, producto.Stock, 1));
        }
      });
    } else {
      this.eliminarProductoOrden(id);
    }
    this.actualizarTotal();
    //this.listaProductosOrden=[];        
  }
  eliminarProductoOrden(id: number) {
    const index = this.listaProductosOrden.findIndex(producto => producto.Id_Pro === id);
    const indexProducts = this.listaProductos.findIndex(producto => producto.Id_Pro === id);
    this.listaProductosOrden.splice(index, 1);
    this.listaProductos[indexProducts].Seleccionado = false;
    this.listaProductosOrden = [...this.listaProductosOrden];

    this.actualizarTotal();
  }
  actualizarSubtotal(idProducto: number) {
    var indice;
    indice = this.listaProductosOrden.findIndex(x => x.Id_Pro == idProducto)
    this.controlarProductoStock(indice);
    this.listaProductosOrden[indice].Subtotal = this.listaProductosOrden[indice].Cantidad * this.listaProductosOrden[indice].Precio
    this.actualizarTotal();
  }

  actualizarTotal() {
    this.total = 0;
    this.listaProductosOrden.forEach(sub => {
      this.total += sub.Subtotal
    });
  }

  controlarProductoStock(indiceProducto:number){
    if (this.listaProductosOrden[indiceProducto].Cantidad>this.listaProductosOrden[indiceProducto].Stock) {
      this.listaProductosOrden[indiceProducto].Cantidad=1
      alert('Por favor ingrese una cantidad de acorde al stock')
    }
    if (this.listaProductosOrden[indiceProducto].Cantidad<1) {      
      this.listaProductosOrden[indiceProducto].Cantidad=1;
    }
  }

  actualizarProductosFiltrados(listaProd: Productos[]) {
    this.listaProductos = listaProd
    this.listaProductos.filter(x => x.Seleccionado == true).forEach(
      producto => {
        var indice = this.listaProductosOrden.findIndex(x => x.Id_Pro == producto.Id_Pro)        
        if (indice == -1) {
          this.listaProductosOrden.push(new ProductosOrden(producto.Id_Pro, producto.Nombre, producto.Marca, producto.Precio, producto.Stock, 1));
        }
      }
    );
    if (this.listaProductos.filter(x => x.Seleccionado == true).length != this.listaProductosOrden.length) {
      this.listaProductosOrden.forEach(productoOrden => {
        var indice = this.listaProductos.filter(x => x.Seleccionado == true).findIndex(x => x.Id_Pro == productoOrden.Id_Pro)
        if (indice == -1) {
          var indiceAux = this.listaProductosOrden.findIndex(x => x.Id_Pro == productoOrden.Id_Pro)
          this.listaProductosOrden.splice(indiceAux, 1);
          this.listaProductosOrden = [...this.listaProductosOrden];
        }
      });
    }
    this.actualizarTotal();
  }

  IrFactura(){
    this.ruta.navigate(['/factura'])
  }


}
