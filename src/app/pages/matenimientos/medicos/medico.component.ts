import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicosService } from 'src/app/services/medicos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!:FormGroup
  public hospitales:any
  public hospitalSelected!:Hospital
  public medicoSelected!:Medico


  constructor(private fb: FormBuilder,
            private hospitalServices:HospitalService,
            private medicoServices:MedicosService,
            private router:Router,
            private activaredRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activaredRoute.params.subscribe(params=>{
      this.getMedicoById( params['id'])
    })


    this.medicoForm = this.fb.group({
      nombre:['',Validators.required],
      hospital:['',Validators.required]
    })
    this.cargarhospitales()
    this.medicoForm.get('hospital')?.valueChanges
    .subscribe(hospitalID=>{
      this.hospitalSelected= this.hospitales.find((h:any)=> h._id === hospitalID)

    })
  }

  guardarMedico(){

    if(this.medicoSelected){
      const data={
        ...this.medicoForm.value,
        _id:this.medicoSelected._id
      }
        this.medicoServices.actualizarMedicos(data)
        .subscribe(resp=>{
          Swal.fire('Actualizado',`${data.nombre} actualizado correctamente` ,'success')
        })
        return
    }

    const {nombre}=this.medicoForm.value

    this.medicoServices.crearMedicos(this.medicoForm.value)
    .subscribe((resp:any)=>{

      Swal.fire('Creado',`${nombre} creado correctamente` ,'success')

        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
    })


  }


  cargarhospitales(){
    this.hospitalServices.cargarHospitales()
    .subscribe((resp:Hospital[])=>{
      this.hospitales=resp
    })
  }

  getMedicoById(id:string){
    if(id==='nuevo'){

       return
    }
    this.medicoServices.cargarMedicosById(id)
    .pipe(
      delay(100)
    )
    .subscribe((resp:any)=>{
      if(!resp){
        this.router.navigateByUrl(`/dashboard/medicos`);
        return
      }

      const {nombre, hospital:{_id}}= resp

      this.medicoSelected=resp
      this.medicoForm.setValue({nombre, hospital:_id})
    })
  }
}
