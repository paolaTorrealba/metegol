import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastService } from 'src/app/servicios/toast.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // public email: string;
  // public password: string;
  // errorMessage: string = '';
  // form: FormGroup;
  // defaultUsers: Array<any> = [];
  // usuario: Usuario;
  // suscripcion:Subscription;
  
  validations_form: FormGroup;
  errorMessage: string = '';
  defaultUsers: Array<any> = [];
  usuario: Usuario;
  public email;
  public password;
 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UsuarioService,
    private toastService:ToastService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private storage: Storage

   
  ) { 
        console.log("estoy en el contructor de login")
    // this.usuario= new Usuario();
    // this.usuario.email='';
    // this.usuario.passoword='';
    // this.email='';
    // this.password='';
  }

  ngOnInit() {
    // this.addDefaultUser();
    this.agregarUsuariosDefault();
    this.validations_form = this.formBuilder.group({
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

  agregarUsuariosDefault(){
    this.defaultUsers.push({"email":"anonimo@anonimo.com", "password":"444444", "perfil":"usuario", "sexo":"masculino"});
    this.defaultUsers.push({"email":"tester@tester.com", "password":"555555", "perfil":"tester","sexo": "femenino"});
    this.defaultUsers.push({"email":"admin@admin.com", "password":"111111", "perfil":"admin", "sexo":"femenino"});
    this.defaultUsers.push({"email":"invitado@invitado.com", "password":"222222", "perfil":"invitado", "sexo":"femenino"});
    this.defaultUsers.push({"email":"usuario@usuario.com", "password":"333333", "perfil":"usuario", "sexo":"masculino"});

  }

  SetearUsuario(email: string, password: string) {
    console.log("seteo de usuario", email, password)
    this.email = email;
    this.password = password;   
  
  }
  loginUsuario(value){
    console.log("value", value)
     value.email=this.email;
    value.password=this.password; 
    
    console.log("value2", value) 
    this.presentLoading();  
    this.authService.loginUser(value)
    .then(res => {
      this.errorMessage = "";
      this.navCtrl.navigateForward('/home');
    }, err => {
      this.errorMessage = err.message;
    })
  }


  // setDefaultUser() {
  //   this.email=this.usuario['email'];
  //   this.password=this.usuario['password'];
  //   console.log("setDefaultUser ",this.usuario)
  //   // this.onSubmitLogin(this.usuario);
  //   this.inicio();
  // }

  // async onSubmitLogin(form) { 
  //   this.email=this.usuario['email'];
  //   this.password=this.usuario['password'];
  //   if(this.email=="admin@admin.com"){
  //     console.log("es admin")
  //     localStorage.setItem("perfilMetegol","admin");
  //   } else{
  //     localStorage.setItem("perfilMetegol","x");
  //    }


  //   form.email=this.usuario['email'];
  //   form.password=this.usuario['password'];
  //   console.log("onSubmitLogin +",form) 
  //   let respuesta;
  //   this.presentLoading();
    
  //   try {

  //   this.authService.loginUser(form)
  //   .then(res => {
  //     console.log("resuesta:", res)
  //     this.errorMessage = "";
  //     console.log("guardo en storage ",form.perfil)
  //     this.storage.set('perfil', form.perfil);
  //     this.router.navigate(['/home']);
  //   }, err => {
  //     console.log("error de login: ",err)
  //     this.errorMessage = err.message;
  //   })
  // ------------------
      // respuesta = await this.authService.logIn(form.email, form.password);
      // console.log("respuesta", respuesta)
      // this.suscripcion = this.userService.getUser(respuesta.user.uid)
      // .subscribe(async usuario => {
      //   if (usuario != undefined) {         
      //     if(respuesta.user.emailVerified != true) {
      //       respuesta.user.sendEmailVerification();
      //       this.toastService.mostrarToast('Error: Debe verificar su email'+respuesta.user, 'error');     
      //     } else {   
      //       this.router.navigate([`/home`]);
      //       this.suscripcion.unsubscribe();
      //     }
      //    }   
      // })        
    // } catch (error) {
    //   console.log("error", error);
    //   this.toastService.mostrarToast('Error: Verifique usuario y contraseña', 'error');
    // } 
    

    
  // }

 
//  inicio(){
//    try{
//     this.email=this.usuario['email'];
//     this.password=this.usuario['password'];
//     localStorage.setItem("userMetegol",this.email);
//     if(this.email=="admin@admin.com"){
//       console.log("es admin")
//       localStorage.setItem("perfilMetegol","admin");
//     }
//    else{
//     localStorage.setItem("perfilMetegol","x");
//    }
//     this.authService.loginUser(this.usuario)
//     .then(res => {
//       console.log("resuesta:", res)
//       this.errorMessage = "";
//       // console.log("guardo en storage ",form.perfil)
//       // this.storage.set('perfil', form.perfil);
//       // this.router.navigate(['/home']);

//       this.presentLoading();
//       this.navCtrl.navigateForward('/home');
//     }, err => {
//       console.log("error de login: ",err)
//       this.errorMessage = err.message;
//     })
      
//     } catch (error) {
//       console.log("error", error);
//       this.toastService.mostrarToast('Error: Verifique usuario y contraseña', 'error');
//     } 
//   }
 

}

