import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario!:Usuario
  constructor(private usuarioServices: UsuarioService,
               private router:Router) { 

    this.usuario = usuarioServices.usuario
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioServices.logout()
  }

  buscar(termino:string){
    if(termino.length == 0){
      // this.router.navigateByUrl('dash')
      return
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}` )
  }
}
