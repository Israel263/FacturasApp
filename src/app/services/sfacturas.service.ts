import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios, Productos, Orden, DetOrdenes, Reporte } from './../Models/Entities.model'
import { LoginService } from '../components/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class SFacturasService {
  //url:string="http://localhost:65294/SFacturas.svc"
  //url:string="http://localhost/SFacturas.svc"
  url: string = "http://serveram.somee.com/api"
  constructor(private http: HttpClient, private loginService:LoginService) { }

  //PRODUCTOS--------------------------------------------------------------------
  crearProducto(producto: Productos) {
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "/Productos/CrearProducto", producto, { headers: cabecera });
  }
  actualizarProducto(producto: Productos) {
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "/Productos/ActualizarProducto", producto, { headers: cabecera });
  }
  retornarProductos() {
    return this.http.get<Productos[]>(this.url + "/Productos/ListaProductos")
  }
  // eliminarProducto(idProducto:number){
  //   return this.http.delete<boolean>(this.url+"/EliminarProducto/"+idProducto)
  // }
  //USUARIOS--------------------------------------------------------------------
  crearUsuario(cliente: Usuarios) {
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "/Usuarios/CrearUsuario", cliente, { headers: cabecera });
  }
  crearUsuarioFirebase(usuario: Usuarios) {
    return this.http.post('https://facturacion-app-5ae81-default-rtdb.firebaseio.com/datos.json', usuario);
  }
  actualizarUsuarioFirebase(indice: number, usuario:Usuarios) {
    return this.http.put('https://facturacion-app-5ae81-default-rtdb.firebaseio.com/datos/'+indice+'.json', usuario);
  }
  listarUsuariosFirebase() {
    const token = this.loginService.getIdToken();
    return this.http.get('https://facturacion-app-5ae81-default-rtdb.firebaseio.com/datos.json?auth='+token);
  }
  eliminarUsuarioFirebase(indice: number) {
    return this.http.delete('https://facturacion-app-5ae81-default-rtdb.firebaseio.com/datos/'+indice+'.json');
  }
  retornarUsuarios() {
    return this.http.get<Usuarios[]>(this.url + "/Usuarios/ListarUsuarios")
  }
  // eliminarCliente(idCliente:number){    
  //   return this.http.delete<boolean>(this.url+"/EliminarCliente/"+idCliente)
  // }

  //FACTURAS----------------------------------------------------------------------
  retornarFactura(id_orden: number) {
    return this.http.get<Orden>(this.url + "/OrdenVentas/DevolverOrdenVenta/" + id_orden)
  }
  // retornarDetalles(id_fac:number){    
  //   return this.http.get<DetOrdenes[]>(this.url+"/DevolverDetFacturas/"+id_fac)
  // }

  crearOrden(orden: Orden) {
    return this.http.post<number>(this.url + "/OrdenVentas/GuardarOrdenVenta", orden);
  }
  crearDetalle(detalle: DetOrdenes) {
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<number>(this.url + "/DetalleOrdenes/GuardarDetalleOrden", detalle, { headers: cabecera });
  }
  //---------------
  InsertarProductos(listaProductos: DetOrdenes[]) {
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<number>(this.url + "/InsertarProductos", listaProductos, { headers: cabecera });
  }
  listarOrdenes() {
    return this.http.get<Orden[]>(this.url + "/OrdenVentas/ListaOrdenesVentas")
  }
  listarRreporte() {
    return this.http.get<Reporte>(this.url + "/ObtenerReporte")
  }
  // EliminarFactura(id_factura:number){
  //   return this.http.delete<boolean>(this.url+'/EliminarFactura/'+id_factura)
  // }
}
