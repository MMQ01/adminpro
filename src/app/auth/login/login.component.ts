import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted=false

  loginForm!:FormGroup



  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioServices:UsuarioService) {

    this.loginForm= this.fb.group({

      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required],
      remember:[false]


    })
              }




  login(){
    // console.log(this.loginForm.value);
    this.usuarioServices.login(this.loginForm.value)
    .subscribe(resp=>{
      console.log(resp);

    },err =>{
      //error
      Swal.fire('Error',err.error.msg,'error')

    })

    // this.router.navigateByUrl('/')
  }
}
