import { LoginForm } from './../interfaces/login-form.interfaces';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { map, tap, Observable, catchError, of, delay } from 'rxjs';
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
        localStorage.removeItem('menu');
      })
    }

  }


  validatToken():Observable<boolean>{


    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
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

        this.guardarLocalStorage(resp.token,resp.menu)
        return true
      }),
      catchError(error=> of(false))
    )
  }

  crearUsuario(params:RegisterForm){

    return this.http.post(`${base_url}/usuarios`,params)
    .pipe(
      tap( (resp:any) =>{
        this.guardarLocalStorage(resp.token,resp.menu)
      })
    )
  }

  acutalizarPerfil(data:{email:string, nombre:string, role:string}){
    data={
      ...data,
      role: this.usuario.role || ''
    }
    console.log(data);

    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
      headers:{
        'x-token':this.token
      }
    })

  }



  login(params:LoginForm){

    return this.http.post(`${base_url}/login`,params)
    .pipe(
      tap( (resp:any) =>{
        this.guardarLocalStorage(resp.token,resp.menu)
      })
    )
  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap( (resp:any) =>{
        console.log(resp);

        this.guardarLocalStorage(resp.token,resp.menu)
        localStorage.setItem('email',resp.email)
      })
    )
  }

  cargarUsuarios(desde:number=0){
  const url=`${base_url}/usuarios?desde=${desde}`

   return this.http.get(url,this.headers)
   .pipe(
     map((resp:any)=>{
      const usuarios = resp.usuarios.map((user:any)=> new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid))
      return {
        total:resp.total,
        usuarios
      };
     })
   )

  }

  elimnarUsuario(usuario:Usuario){
    const url=`${base_url}/usuarios/${usuario.uid}`
    return this.http.delete(url,this.headers)
  }

  guardarUsuario(data:Usuario){
    
    console.log(data);

    return this.http.put(`${base_url}/usuarios/${data.uid}`,data,{
      headers:{
        'x-token':this.token
      }
    })

  }
  

  guardarLocalStorage(token:string, menu:any){
    localStorage.setItem('token',token)
    localStorage.setItem('menu', JSON.stringify(menu))
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

  get role():any{
    return this.usuario.role
  }

}
