import { LoginForm } from './../interfaces/login-form.interfaces';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { tap } from 'rxjs';

const base_url=environment.base_URL

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

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
}
