import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  constructor(private hospitalService:HospitalService) { }

  hospitales:Hospital[]=[]
  cargando:boolean=true

  ngOnInit(): void {

   this.cargarHospitales()
  }

  cargarHospitales(){
    this.cargando=true
    this.hospitalService.cargarHospitales()
    .subscribe(
      resp=>{
        console.log(resp);
        this.hospitales=resp
        this.cargando=false
      }
    )
  }
}
