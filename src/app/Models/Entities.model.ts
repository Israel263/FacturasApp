import { CANCELLED } from "dns";

export class Clientes {    
    constructor(Id_Cli:number,Cedula:string, Nombre:string, Apellido:string, Ciudad:string, Telefono:string ){
        this.Id_Cli=Id_Cli;
        this.Cedula=Cedula;
        this.Nombre=Nombre;
        this.Apellido=Apellido;
        this.Ciudad=Ciudad;
        this.Telefono=Telefono;
    }
    Id_Cli: number = 0;
    Cedula: string = ""
    Nombre: string = "";
    Apellido: string = "";
    Ciudad: string = "";
    Telefono: string = "";    
}
export class Productos {    
    constructor(Id_Pro:number, Nombre:string, Marca:string, Precio:number, Stock:number ){
        this.Id_Pro=Id_Pro;
        this.Nombre=Nombre;        
        this.Marca=Marca;
        this.Precio=Precio;
        this.Stock=Stock;
    }
    Id_Pro: number = 0;
    Nombre: string = "";
    Precio: number = 0;
    Marca: string = "";
    Stock: number = 0;
    Seleccionado:boolean=false;
}

export class Facturas{
    constructor(id_Fac:number,id_Cli_Per:number,fecha:string,total:number)
        {
            this.Id_Fac = id_Fac;
            this.Id_Cli_Per = id_Cli_Per;
            this.Fecha = '/Date(' + new Date(fecha).getTime() + ')/';
            this.Total = total;
        }
        
        Id_Fac:number=0;
        Id_Cli_Per:number=0;
        Fecha:string="";
        Total:number=0;
}

export class DetFacturas{
    constructor(id_Det_Fac:number,id_Fac_Per:number,id_Pro_Per:number,cantidad:number,subtotal:number)
        {
            this.Id_Det_Fac=id_Det_Fac;
            this.Id_Fac_Per = id_Fac_Per;
            this.Id_Pro_Per = id_Pro_Per;
            this.Cantidad = cantidad;
            this.Subtotal = subtotal;
        }
        Id_Det_Fac:number=0;
        Id_Fac_Per:number=0;
        Id_Pro_Per:number=0;
        Cantidad:number=0;
        Subtotal:number=0;        
}
//Another Entities
export class ProductosOrden {    
    constructor(Id_Pro:number, Nombre:string, Marca:string, Precio:number, Stock:number, Cantidad:number, subtotal?:number ){
        this.Id_Pro=Id_Pro;
        this.Nombre=Nombre;
        this.Nombre=Nombre;
        this.Marca=Marca;
        this.Precio=Precio;
        this.Stock=Stock;
        this.Cantidad=Cantidad;
        this.Subtotal=subtotal!=undefined?subtotal:this.Cantidad*this.Precio
    }    
    Id_Pro: number = 0;
    Nombre: string = "";
    Precio: number = 0;
    Marca: string = "";
    Stock: number = 0;
    Cantidad:number=0;
    Subtotal:number=this.Cantidad*this.Precio;
}

export class FacturaVista {    
    constructor(Id_Fac:number, Fecha:string, Cliente:string, Monto:number){
        this.Id_Fac=Id_Fac;
        this.Cliente=Cliente;        
        this.Fecha=Fecha
        // this.Fecha='/Date(' + new Date(Fecha).getTime() + ')/';
        this.Monto=Monto;        
    }    
    Id_Fac: number = 0;
    Cliente: string = "";
    Monto: number = 0;
    Fecha: string = "";    
}
    export class Reporte {
        constructor() {
    
        }
        compraAlta: number = 0;
        compraBaja: number = 0
        clienteBaja: string = ""
        clienteAlta: string = ""
        ListaDescriptores:string[]=[]
        ListaValores:number[]=[]    
    }
