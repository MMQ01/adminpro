import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url=environment.base_URL
@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http:HttpClient) { }


  cargarMedicos(){
    const url=`${base_url}/medicos`

     return this.http.get(url,this.headers)
      .pipe(
        map((resp:any)=>resp.medicos)
      )


    }

  cargarMedicosById(id:string){
    const url=`${base_url}/medicos/${id}`

     return this.http.get(url,this.headers)
      .pipe(
        map((resp:any)=>resp.medicos)
      )


    }

  crearMedicos(medico:{nombre:string,hospital:string}){
    const url=`${base_url}/medicos`

     return this.http.post(url,medico,this.headers)

    }

  actualizarMedicos(medico:Medico){
    const url=`${base_url}/medicos/${medico._id}`

     return this.http.put(url,medico,this.headers)

    }

  borrarMedicos(_id:any){
    const url=`${base_url}/medicos/${_id}`

     return this.http.delete(url,this.headers)

    }


    get headers():any{

      return {
        headers:{
          'x-token':this.token
        }
      }


    }
    get token():string{
      return localStorage.getItem('token')||''
    }




}
