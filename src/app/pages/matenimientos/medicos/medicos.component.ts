import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BuquedasService } from 'src/app/services/buquedas.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  medicos:Medico[]=[]
  cargando:boolean = true
  public imgSubs!:Subscription
  constructor(private medicoServices:MedicosService,
              private modalImagenServices:ModalImagenService,
              private busquedaServices:BuquedasService) { }

  ngOnInit(): void {

    this.cargarMedicos()


    this.imgSubs=this.modalImagenServices.nuevaImagen
    .pipe(
     delay(100)
    )
    .subscribe(img=>
     {
       this.cargarMedicos()
     })

  }

  cargarMedicos(){
    this.cargando=true
    this.medicoServices.cargarMedicos()
    .subscribe(resp=>{
      this.cargando=false
      console.log(resp);
      this.medicos=resp

    })
  }


  abrirModal(medico:Medico){
    this.modalImagenServices.abrirModal('medicos',medico._id||'',medico.img)
  }

  buscar(termino:string){
    this.cargando=true
    if(termino.length ===0){
      this.cargarMedicos()
    }
    this.busquedaServices.buscar('medicos',termino)
    .subscribe((resp:any)=>{
      console.log(resp);

      this.medicos=resp
      this.cargando=false
    })

  }

  borrarMedico(medico:Medico){


    Swal.fire({
      title: '¿Borrar médico?',
      text: "Esta a punto de borrar a "+medico.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
       this.medicoServices.borrarMedicos(medico._id)
       .subscribe(resp=>
        {


          Swal.fire('Médico borrado',`${medico.nombre} fue eliminado correctamente`,'success')
          this.cargarMedicos()
        }
       )
      }
    })

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
   }

}
