import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Clientes, Productos, Facturas, DetFacturas} from './../Models/Entities.model'

@Injectable({
  providedIn: 'root'
})
export class SFacturasService {

  url:string="http://localhost:65294/SFacturas.svc"
  constructor(private http: HttpClient) { }

  //PRODUCTOS--------------------------------------------------------------------
  crearProducto(producto:Productos){
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post(this.url+"/CrearProducto", producto, { headers: cabecera });
  }
  retornarProductos(){    
    return this.http.get<Productos[]>(this.url+"/ListaProductos")
  }
  eliminarProducto(idProducto:number){
    return this.http.delete<boolean>(this.url+"/EliminarProducto/"+idProducto)
  }
  //CLIENTES--------------------------------------------------------------------
  crearCliente(cliente:Clientes){
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post(this.url+"/CrearProducto", cliente, { headers: cabecera });
  }
  retornarClientes(){    
    return this.http.get<Clientes[]>(this.url+"/ListaClientes")
  }
  eliminarCliente(idCliente:number){
    return this.http.delete<boolean>(this.url+"/EliminarCliente/"+idCliente)
  }
}
