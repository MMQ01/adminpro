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
