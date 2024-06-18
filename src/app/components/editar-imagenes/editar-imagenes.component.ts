import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ImgsProductos } from '../../Models/Entities.model';

@Component({
  selector: 'app-editar-imagenes',
  templateUrl: './editar-imagenes.component.html',
  styleUrl: './editar-imagenes.component.css'
})
export class EditarImagenesComponent {

  fotos:string[]=[]
  @Input() imagenes: ImgsProductos[] = []
  @Output() abrirModal= new EventEmitter<boolean>();
  eleccionImagen: number = 0

  fileBytes: Uint8Array | undefined;

  cambiarImagen(estaSiguiendo: boolean) {
    if (estaSiguiendo) {
      if (this.imagenes.length - 1 == this.eleccionImagen) {
        this.eleccionImagen = 0;
      } else {
        this.eleccionImagen++;
      }
    }
    if (!estaSiguiendo) {
      if (this.eleccionImagen == 0) {
        this.eleccionImagen = this.imagenes.length - 1;
      } else {
        this.eleccionImagen--;
      }
    }
  }


  CambioImagenes(event: any) {
    if (this.imagenes.length >= 5) {
      alert('Solo se permite subir 5 fotos por vivienda')
    }else{
      Array.from(event.target.files).forEach((file) => {

        if (this.imagenes.length >= 5) {
          alert('Solo se permite subir 5 fotos por vivienda')
        }else{
       
          if (file instanceof File) {
  
            const selectedFile: File = file;
            if (selectedFile) {
              const reader = new FileReader();
  
              reader.onload = (e: any) => {
                const arrayBuffer: ArrayBuffer | null = e.target.result;
                if (arrayBuffer) {
                  const uintArray = new Uint8Array(arrayBuffer);
                  this.fileBytes = uintArray;
                  const stringBytes = this.uint8ArrayToBase64(uintArray);
                  let foto: ImgsProductos = new ImgsProductos(0, 0, stringBytes);
                  this.imagenes.push(foto);
  
                  const byteArray = new Uint8Array(uintArray);
  
                  const blob = new Blob([byteArray], { type: 'image/jpeg' });
                  let imageUrl = URL.createObjectURL(blob);
                  this.fotos.push(imageUrl);
                }
              };
  
              reader.readAsArrayBuffer(selectedFile);
            }
  
          }
        }
      });      
    }
  }

  private uint8ArrayToBase64(array: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < array.length; i++) {
      binary += String.fromCharCode(array[i]);
    }
    return btoa(binary);
  }

}
