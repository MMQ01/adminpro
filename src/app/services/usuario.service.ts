import { LoginForm } from './../interfaces/login-form.interfaces';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { map, tap, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google:any
const base_url=environment.base_URL


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient,
              private router:Router,
              private ngZone:NgZone) { }

  



              
  logout(){
    const email=localStorage.getItem('email')|| '';
    google.accounts.id.revoke(email,()=> {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    })
  }


  validatToken():Observable<boolean>{
    const token =  localStorage.getItem('token') || ''

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token)
      }),
      map(resp=>true),
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
