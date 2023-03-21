import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!:FormGroup
  public usuario!: Usuario
  public imagenSubida!:File
  public imgTemp:any =''

  constructor( private fb:FormBuilder,
                private usuarioServices:UsuarioService,
                private fileUploadServices:FileUploadService) {

                  this.usuario=usuarioServices.usuario
                }

  ngOnInit(): void {

    this.perfilForm = this.fb.group(
      {
        nombre:[this.usuario.nombre,Validators.required],
        email:[this.usuario.email,[Validators.required,Validators.email]]
      }
    )

  }


  async actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioServices.acutalizarPerfil(this.perfilForm.value)
      .subscribe(resp=>{
        console.log(resp);
        const {nombre,email}=this.perfilForm.value
        this.usuario.nombre=nombre
        this.usuario.email=email

        Swal.fire('Guardado','Los cambios fueron guardados','success')
      },(err)=>{
        Swal.fire('Error',err.error.msg,'error')
        console.log(err.error.msg);

      })
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
    this.fileUploadServices.actualizarFoto(this.imagenSubida,'usuarios',this.usuario.uid)
    .then(resp=>{
     this.usuario.img=resp;
     Swal.fire('Guardado','Imagen de usuario actualizada','success')
    }).catch(err=>{
      Swal.fire('Error','No se pudo subir la imagen','error')
    })
  }
}
