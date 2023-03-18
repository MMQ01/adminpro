import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private usuarioServices: UsuarioService,
              private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    console.log('Paso por el canActivated del guard');
   
    return this.usuarioServices.validatToken()
    .pipe(
      tap(isAuth =>{
        if(!isAuth){
          this.router.navigateByUrl('/login')
        }
      })
    );
  }
  
}
