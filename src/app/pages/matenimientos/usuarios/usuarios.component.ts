import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BuquedasService } from 'src/app/services/buquedas.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number=0
  public usuarios:any
  public usuariosTemp:any
  cargando:boolean=true
  desde:number=0

  constructor(private usuarioServices:UsuarioService,
              private busquedaServices:BuquedasService) { }

  ngOnInit(): void {

   this.cargarUsuarios()
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

}
