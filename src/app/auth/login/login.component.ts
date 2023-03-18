import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit{

  public formSubmitted=false

  loginForm!:FormGroup

  @ViewChild('googleBtn') googleBtn!:ElementRef

  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioServices:UsuarioService,
              private ngZone:NgZone) {

    this.loginForm= this.fb.group({

      email:[localStorage.getItem('email') || '',[Validators.required, Validators.email]],
      password:['',Validators.required],
      remember:[false]


    })
     }


  ngAfterViewInit(): void {
    this.googleInit()
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "374495761157-kjd7c35a25sj4adchsojhqa6ld3j16gj.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response)
    }); 

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

  }

  handleCredentialResponse(response:any){
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioServices.loginGoogle(response.credential)
    .subscribe(resp=>{
      // console.log({login:resp})
      this.ngZone.run(()=>{

        this.router.navigateByUrl('/')
      })
      }
    )
  }

  login(){
    // console.log(this.loginForm.value);
    this.usuarioServices.login(this.loginForm.value)
    .subscribe(resp=>{
      console.log(resp);
      
      if(this.loginForm.get('remember')?.value){
        localStorage.setItem('email',this.loginForm.get('email')?.value)
      }else{
        localStorage.removeItem('email')
      }
      this.router.navigateByUrl('/')
    },err =>{
      //error
      Swal.fire('Error',err.error.msg,'error')

    })

    // this.router.navigateByUrl('/')
  }
}
