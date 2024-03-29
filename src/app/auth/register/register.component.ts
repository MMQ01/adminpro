import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public formSubmitted=false

  public registerForm= this.fb.group({
    nombre:['',[Validators.required, Validators.minLength(3)]],
    email:['',[Validators.required, Validators.email]],
    password:['',Validators.required],
    password2:['',Validators.required],
    terminos:[false,Validators.required],

  },{
    validators: this.passwordIguales('password','password2')
  })

  constructor(private fb:FormBuilder,
              private usuarioServices:UsuarioService) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    this.formSubmitted=true
    console.log(this.registerForm.value);

    if(!this.registerForm.valid){
    return;
    }

    //realizar posteo
    this.usuarioServices.crearUsuario(this.registerForm.value)
    .subscribe(resp=>{
      console.log('Usuario creado');
      console.log(resp);
    },err =>{
      //error
      Swal.fire('Error',err.error.msg,'error')

    })

  }
  campoNoValido(campo:string):boolean{

    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true
    }else{
      return false
    }


  }
  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value

    if((pass1 !==pass2) && this.formSubmitted){
      return true
    }else{
      return false;
    }
  }
  passwordIguales(pass1:string,pass2:string){

    return (formGroup: FormGroup)=>{

      const pass1Control=formGroup.get(pass1);
      const pass2Control=formGroup.get(pass2);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsIgual:true})

      }
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted
  }

}
