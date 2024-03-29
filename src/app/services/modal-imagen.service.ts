import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url=environment.base_URL
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal:boolean=true
  public tipo?:'usuarios'|'medicos'|'hospitales'
  public id?:string
  public img?:string

  public nuevaImagen:EventEmitter<String> = new EventEmitter<String>()
  pipe: any;

  constructor() { }

  get ocultarModal(){
    return this._ocultarModal
  }

  abrirModal(
    tipo:'usuarios'|'medicos'|'hospitales',
    id:string,
    img?:string
  ){
    this._ocultarModal=false
    this.tipo=tipo;
    this.id=id;
    this.img=img || 'no-imagen';

    if(this.img.includes('http')){
      this.img=img
    }else{
      this.img=`${base_url}/upload/${tipo}/${img}`
    }
  
  }


  cerrarModal(){
    this._ocultarModal=true
  }


}
