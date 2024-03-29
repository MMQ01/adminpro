import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';


const base_url=environment.base_URL

@Injectable({
  providedIn: 'root'
})
export class BuquedasService {
  public usuario!:Usuario

  constructor(private http:HttpClient) { }

  private transformarUsuario(resultados:any):Usuario[]{


    return resultados.map(
      (user:any) => new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid)
      );
  }

  private transformarHospitales(resultados:any):Hospital[]{


    return resultados
  }
  private transformarMedicos(resultados:any):Medico[]{


    return resultados
  }



  buscar(
    tipo: 'usuarios'|'medicos'|'hospitales',
    termino: string
  ) {

  const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
  return this.http.get<any[]>( url, this.headers )
          .pipe(
            map( (resp: any ) => {

              switch ( tipo ) {
                case 'usuarios':
                  return this.transformarUsuario( resp.resultados )
                case 'hospitales':
                  return this.transformarHospitales( resp.resultados )
                case 'medicos':
                  return this.transformarMedicos( resp.resultados )

                default:
                  return [];
              }

            })
          );

}


  busquedaGlobal(termino:string){
    const url = `${ base_url }/todo/${ termino }`;
  return this.http.get<any[]>( url, this.headers )
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

  get uid():string{
    return this.usuario.uid || ''
  }

}
