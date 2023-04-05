import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {


  constructor(private usuarioServices: UsuarioService,
              private router:Router){}

              
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioServices.validatToken()
    .pipe(
      tap(isAuth =>{
        if(!isAuth){
          this.router.navigateByUrl('/login')
        }
      })
    );
  }
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
