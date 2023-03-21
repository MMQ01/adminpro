import { LoginForm } from './../interfaces/login-form.interfaces';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { map, tap, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const google:any
const base_url=environment.base_URL


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient,
              private router:Router,
              private ngZone:NgZone) { }

  


  public usuario!:Usuario
              
  logout(){
    const email=localStorage.getItem('email')|| '';
    if(!email){
       this.router.navigateByUrl('/login');
       localStorage.removeItem('token');
    }else{
      google.accounts.id.revoke(email,()=> {
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/login');
        })
        localStorage.removeItem('token');
        localStorage.removeItem('email');
      })
    }
 
  }


  validatToken():Observable<boolean>{
    const token =  localStorage.getItem('token') || ''

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      map((resp:any)=>{

        const {
          nombre,
          email,
          img='',
          google,
          role,
          uid
        }= resp.usuario
        this.usuario = new Usuario(nombre,email,'',img,google,role,uid)

        localStorage.setItem('token',resp.token)
        return true
      }),
      catchError(error=> of(false))
    )
  }

  crearUsuario(params:RegisterForm){

    return this.http.post(`${base_url}/usuarios`,params)
    .pipe(
      tap( (resp:any) =>{
        localStorage.setItem('token',resp.token)
      })
    )
  }

  acutalizarPerfil(data:{email:string, nombre:string}){

    return this.http.post(`${base_url}/usuarios`,data)

  }



  login(params:LoginForm){

    return this.http.post(`${base_url}/login`,params)
    .pipe(
      tap( (resp:any) =>{
        localStorage.setItem('token',resp.token)
      })
    )
  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap( (resp:any) =>{
        console.log(resp);
        
        localStorage.setItem('token',resp.token)
        localStorage.setItem('email',resp.email)
      })
    )
  }
}
