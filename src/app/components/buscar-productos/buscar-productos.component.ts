import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SFacturasService } from '../../services/sfacturas.service';
import { Productos } from '../../Models/Entities.model';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrl: './buscar-productos.component.scss'
})
export class BuscarProductosComponent implements OnInit{
  @Output() cerrar = new EventEmitter<boolean>();
  @Output() productosRegresar = new EventEmitter<Productos[]>();
  @Input() listaProductos: Productos[] = []
  listaProductosFiltrados: Productos[]=[]
  seleccionBuscar: string = '1';
  filtro:string='';


  constructor(public sFacturas: SFacturasService) { }
  ngOnInit(): void {
    this.listaProductosFiltrados=this.listaProductos;
  }

  BuscarProductos() {
    try {
      switch (this.seleccionBuscar) {
        case '1':
          this.listaProductosFiltrados=this.listaProductos.filter(x=>x.Id_Pro==parseInt(this.filtro));
          break;
        case '2':
          this.listaProductosFiltrados=this.listaProductos.filter(x=>x.Nombre==this.filtro);
          break;
        case '3':
          this.listaProductosFiltrados=this.listaProductos.filter(x=>x.Marca==this.filtro);
          break;
        case '4':
          this.listaProductosFiltrados=this.listaProductos.filter(x=>x.Precio==parseFloat(this.filtro));
          break;            
      }  
    } catch (error) {
      alert('Por favor inserte los datos en el formato correcto.');
    }
    
  }

  actualizarEstadoProducto(idProducto:number, evento: Event,){    
        const inputElement = evento.target as HTMLInputElement;
        var index = this.listaProductos.findIndex(producto => producto.Id_Pro == idProducto);        
        if (inputElement.checked) {
          this.listaProductos[index].Seleccionado=true;
        }else{
          this.listaProductos[index].Seleccionado=false;
        }
  }

  enviarProductos(){
    this.productosRegresar.emit(this.listaProductos);
    this.cerrar.emit(false);
  }
  
}
