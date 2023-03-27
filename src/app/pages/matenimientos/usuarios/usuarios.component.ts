import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BuquedasService } from 'src/app/services/buquedas.service';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number=0
  public usuarios:any
  public usuariosTemp:any
  cargando:boolean=true
  desde:number=0

  public imgSubs!:Subscription

  constructor(private usuarioServices:UsuarioService,
              private busquedaServices:BuquedasService,
              private modalImagenServices:ModalImagenService) { }
              
  ngOnDestroy(): void {
   this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {

   this.cargarUsuarios()

   this.imgSubs=this.modalImagenServices.nuevaImagen
   .pipe(
    delay(100)
   )
   .subscribe(img=> 
    {
      this.cargarUsuarios()
    })
  }
  
  cargarUsuarios(){
    this.cargando=true
    this.usuarioServices.cargarUsuarios(this.desde)
    .subscribe((resp:any)=>{
      
      this.totalUsuarios=resp?.total
      this.usuarios=resp?.usuarios
      this.usuariosTemp=resp?.usuarios
      console.log(this.usuarios);
      this.cargando=false
    })
  }


  cambiarPagina( valor:number ){
    this.desde += valor

    if(this.desde < 0){
      this.desde=0
    }else if(this.desde > this.totalUsuarios){
      this.desde-=valor
    }

    this.cargarUsuarios()
  }

  buscar(termino:string){
    this.cargando=true
    if(termino.length ===0){
      this.cargando=false
      return this.usuarios=this.usuariosTemp
    }
    this.busquedaServices.buscar('usuarios',termino)
    .subscribe((resp:any)=>{
      console.log(resp);
      
      this.usuarios=resp
      this.cargando=false
    })

  }

  eliminarUsuario(usuario:Usuario){

    if(usuario.uid === this.usuarioServices.uid){
      Swal.fire('Error','No puede borrarse asi mismo','error')
      return
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: "Esta a punto de borrar a "+usuario.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
       this.usuarioServices.elimnarUsuario(usuario)
       .subscribe(resp=> 
        {
         

          Swal.fire('Usuario borrado',`${usuario.nombre} fue eliminado correctamente`,'success')
          this.cargarUsuarios()
        }
       )
      }
    })
  }

  cambiarRole(usuario:Usuario){
    this.usuarioServices.guardarUsuario(usuario)
    .subscribe(resp=>{
      
    })
  }

  abrirModal(usuario:Usuario){
    this.modalImagenServices.abrirModal('usuarios',usuario.uid||'',usuario.img)
  }
}
