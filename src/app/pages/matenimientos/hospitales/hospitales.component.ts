import  Swal  from 'sweetalert2';
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

  guardarCambios(hospital:Hospital){
    this.hospitalService.actualizarHospitales(hospital._id,hospital.nombre)
    .subscribe(resp=>{
      Swal.fire('Actualizado',hospital.nombre,'success')
    })

  }

  eliminarHospital(hospital:Hospital){
    this.hospitalService.borrarHospitales(hospital._id)
    .subscribe(resp=>{
      Swal.fire('Borrado',hospital.nombre,'success')
    })

  }
}
