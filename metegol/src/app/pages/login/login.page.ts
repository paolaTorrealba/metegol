import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastService } from 'src/app/servicios/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;
  form: FormGroup;
  defaultUsers: Array<any> = [];
  usuario: Usuario;
  suscripcion:Subscription;

  splash = true;
  audioSplash = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UsuarioService,
    private toastService:ToastService,
    private loadingController: LoadingController,

   
  ) { 
    this.usuario= new Usuario();
    this.usuario.email='';
    this.usuario.passoword='';
    this.email='';
    this.password='';
  }

  ngOnInit() {
    this.addDefaultUser();
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Espere un momento..."
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }
  // ionViewDidEnter() {
  //   if (this.audioSplash === true) {
  //     let audio = new Audio();
  //     audio.src = 'assets/audio/splash.mp3';
  //     audio.play();
  //     this.audioSplash = false;
  //   }
  //   setTimeout(() => this.splash = false, 4000);
  // }

  validation_messages = {
    'email': [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'Ingrese un email válido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerida.' },
      { type: 'minlength', message: 'La password debe contener al menos 6 catacteres.' }
    ]
  };

  addDefaultUser() {
    this.defaultUsers.push({ "email": "admin@admin.com", "password": "111111" });
    this.defaultUsers.push({ "email": "invitado@invitado.com", "password": "222222" });
    this.defaultUsers.push({ "email": "usuario@usuario.com", "password": "333333" });
    this.defaultUsers.push({ "email": "tester@tester.com", "password": "555555" });
    this.defaultUsers.push({ "email": "anonimo@anonimo.com", "password": "444444" });
  }

  setDefaultUser() {
    this.email=this.usuario['email'];
    this.password=this.usuario['password'];
    console.log("setDefaultUser ",this.usuario)
    this.onSubmitLogin(this.usuario);
  }

  async onSubmitLogin(form) { 
    this.email=this.usuario['email'];
    this.password=this.usuario['password'];
    form.email=this.usuario['email'];
    form.password=this.usuario['password'];
    console.log("onSubmitLogin ",form) 
    let respuesta;
    this.presentLoading();
    
    try {
      respuesta = await this.authService.logIn(form.email, form.password);
      this.suscripcion = this.userService.getUser(respuesta.user.uid)
      .subscribe(async usuario => {
        if (usuario != undefined) {         
          if(respuesta.user.emailVerified != true) {
            respuesta.user.sendEmailVerification();
            this.toastService.mostrarToast('Error: Debe verificar su email', 'error');     
          } else {   
            this.router.navigate([`/home`]);
            this.suscripcion.unsubscribe();
          }
         }   
      })        
    } catch (error) {
      console.log("error", error);
      this.toastService.mostrarToast('Error: Verifique usuario y contraseña', 'error');
    } 
    

    
  }

 
 

}

