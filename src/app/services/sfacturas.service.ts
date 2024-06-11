import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Clientes, Productos, Facturas, DetFacturas, Reporte} from './../Models/Entities.model'

@Injectable({
  providedIn: 'root'
})
export class SFacturasService {
  url:string="http://localhost:65294/SFacturas.svc"
  //url:string="http://localhost/SFacturas.svc"
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
    return this.http.post(this.url+"/CrearCliente", cliente, { headers: cabecera });
  }
  retornarClientes(){    
    return this.http.get<Clientes[]>(this.url+"/ListaClientes")
  }
  eliminarCliente(idCliente:number){    
    return this.http.delete<boolean>(this.url+"/EliminarCliente/"+idCliente)
  }
  //FACTURAS----------------------------------------------------------------------
  retornarFactura(id_fac:number){    
    return this.http.get<Facturas>(this.url+"/DevolverFactura/"+id_fac)
  }
  retornarDetalles(id_fac:number){    
    return this.http.get<DetFacturas[]>(this.url+"/DevolverDetFacturas/"+id_fac)
  }
  
  crearFactura(id_cli:number){    
    return this.http.get<number>(this.url+"/CrearFactura/"+id_cli,);
  }
  InsertarProducto(id_fac:number, id_pro:number, cantidad:number){    
    return this.http.get<number>(this.url+"/InsertarProducto/"+id_fac+'/'+id_pro+'/'+cantidad);
  }
  InsertarProductos(listaProductos:DetFacturas[]){    
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post<number>(this.url+"/InsertarProductos", listaProductos, { headers: cabecera });
  }
  listarFacturas(){    
    return this.http.get<Facturas[]>(this.url+"/RetornarFacturas")
  }
  listarRreporte(){    
    return this.http.get<Reporte>(this.url+"/ObtenerReporte")
  }
  EliminarFactura(id_factura:number){
    return this.http.delete<boolean>(this.url+'/EliminarFactura/'+id_factura)
  }
}
