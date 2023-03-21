import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!:FormGroup

  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {

    this.perfilForm = this.fb.group(
      {
        nombre:['123',Validators.required],
        email:['asdsad',[Validators.required,Validators.email]]
      }
    )

  }


  actualizarPerfil(){
    console.log(this.perfilForm.value);
    
  }
}
