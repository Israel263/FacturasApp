import { Component, OnInit } from '@angular/core';
import { Productos } from '../../Models/Entities.model';
import { SFacturasService } from '../../services/sfacturas.service';
import { error } from 'console';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{
  producto:Productos=new Productos(0,'',0,0)
  productos:Productos[]=[]
  abrirImagenes:boolean=false;
  constructor(private factura:SFacturasService){}

  ngOnInit(): void {
    this.factura.retornarProductos().subscribe(
      respuesta=>{
        if (respuesta.esCorrecto) {
          this.productos=Object.values(respuesta.valor)
        }else{
          console.log(respuesta.mensaje)
        }
      },
      error=>{
        console.log(error)
      }
    )
  }

  

}
