import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

 
  public usuario!: Usuario
  public imagenSubida!:File
  public imgTemp:any =''

  
  constructor(public modalImagenService:ModalImagenService,
              private fileUploadServices:FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp=null
    this.modalImagenService.cerrarModal()
  }

  cambiarImagen(file:File){
    console.log(file);
    this.imagenSubida = file

    if(!file){
      this.imgTemp=''
      return
    }
    const reader=new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend=()=>{
      this.imgTemp=reader.result
    }

  }

  subirImagen(){

    const id=this.modalImagenService.id
    const tipo = this.modalImagenService.tipo

    if(tipo==undefined){
      return
    }

    this.fileUploadServices.actualizarFoto(this.imagenSubida,tipo,id)
    .then(resp=>{
     
     Swal.fire('Guardado','Imagen de usuario actualizada','success')
     this.modalImagenService.nuevaImagen.emit(resp)
     this.cerrarModal()
     
    }).catch(err=>{
      Swal.fire('Error','No se pudo subir la imagen','error')
    })
  }

}
