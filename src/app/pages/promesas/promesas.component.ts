import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {

    //   if(false){

    //     resolve('Hola Mundo')
    //   }else{
    //     reject('Algo salio mal')
    //   }

    // })

    // promesa.then( (msj) =>{
    //   console.log(msj);

    // })
    // .catch(error=>{
    //   console.log('Erro en la promesa ', error);

    // })
    // console.log('Fin del init');
    this.getUsuarios().then(usuario=>{
      console.log(usuario);

    })
  }

  getUsuarios(){

    const promesa = new Promise(resolve =>{

      fetch('https://reqres.in/api/users')
        .then(resp=> resp.json())
        .then(body => resolve(body.data))

    });
    return promesa;
  }
}
