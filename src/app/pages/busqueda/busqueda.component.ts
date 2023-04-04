import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuquedasService } from '../../services/buquedas.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios:Usuario[]=[]
  medicos:Medico[]=[]
  hospitales:Hospital[]=[]


  constructor(private activaRoute:ActivatedRoute,
              private busquedaServices:BuquedasService) { }

  ngOnInit(): void {
    this.activaRoute.params
    .subscribe(({termino})=>{
      this.busquedaGlobal(termino)
    })
  }


  busquedaGlobal(termino:string){
    this.busquedaServices.busquedaGlobal(termino)
    .subscribe((resp:any)=>{
      this.usuarios=resp.usuarios
      this.medicos=resp.medicos
      this.hospitales=resp.hospitales
    })
  }

  
}
