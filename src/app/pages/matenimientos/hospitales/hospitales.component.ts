import  Swal  from 'sweetalert2';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription,delay } from 'rxjs';
import { pipe} from 'rxjs/';
import { BuquedasService } from '../../../services/buquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  constructor(private hospitalService:HospitalService,
              private modalImagenServices:ModalImagenService,
              private busquedaServices:BuquedasService) { }

  hospitales:Hospital[]=[]
  cargando:boolean=true
  private imgSubs!:Subscription

  ngOnInit(): void {

   this.cargarHospitales()

   this.imgSubs=this.modalImagenServices.nuevaImagen
   .pipe(
    delay(100)
   )
   .subscribe(img=>
    {
      this.cargarHospitales()
    })
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
      this.cargarHospitales()
    })

  }

  eliminarHospital(hospital:Hospital){
    this.hospitalService.borrarHospitales(hospital._id)
    .subscribe(resp=>{
      Swal.fire('Borrado',hospital.nombre,'success')
      this.cargarHospitales()
    })

  }


  async abrirSweetAlert(){
    const {value=''} = await Swal.fire({
      input: 'text',
      text:'Crear hospital',
      inputLabel: 'Ingrese un nuevo hospital',
      inputPlaceholder:'Nombre del hospital',
      showCancelButton:true,
    })

    if(value?.trim().length > 0){
      this.hospitalService.crearHospitales(value)
      .subscribe(resp=>{

        this.cargarHospitales()
      })
    }

  }

  abrirModal(hospital:Hospital){
    this.modalImagenServices.abrirModal('hospitales',hospital._id||'',hospital.img)
  }

  buscar(termino:string){
    this.cargando=true
    if(termino.length ===0){
      this.cargarHospitales()
    }
    this.busquedaServices.buscar('hospitales',termino)
    .subscribe((resp:any)=>{
      console.log(resp);

      this.hospitales=resp
      this.cargando=false
    })

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
   }
}
