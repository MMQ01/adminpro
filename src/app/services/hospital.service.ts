import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_URL

@Injectable({
  providedIn: 'root'
})


export class HospitalService {


  public usuario!:Usuario

  constructor(private http:HttpClient) { }


  cargarHospitales(){
    const url=`${base_url}/hospitales`

     return this.http.get(url,this.headers)
      .pipe(
        map((resp:any)=>resp.hospitales)
      )


    }

  crearHospitales(nombre:string,){
    const url=`${base_url}/hospitales`

     return this.http.post(url,{nombre},this.headers)

    }

  actualizarHospitales(_id:any,nombre:string){
    const url=`${base_url}/hospitales/${_id}`

     return this.http.put(url,{nombre},this.headers)

    }

  borrarHospitales(_id:any){
    const url=`${base_url}/hospitales/${_id}`

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
