import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { LoadingController, ActionSheetController, Platform, NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public perfil:string;
  public usu:string;
  public cont:number;
  constructor(
    public router: Router,
    private authService:AuthService,
    public actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private usuarioService:UsuarioService, 
    private platform: Platform,
    private navCtrl: NavController,
  ) { 
  
    
    this.usu = this.authService.getCurrentUser().email;
    console.log("constructor de HOME", this.usu)
    this.presentLoading();
    if( this.usu==undefined){
      this.navCtrl.navigateForward('/login');
    }
  //   this.usu = localStorage.getItem('metegol');
  //  console.log("usu",this.usu)
  //  console.log("perfil ", this.perfil)
  // this.initializeApp();
  }


  
  // initializeApp() {
  //   this.platform.ready().then(() => {  
  //       setTimeout(() => {
        
  //         this.usu = localStorage.getItem("perfilMetegol");
  //         console.log("timeout")         
  //       }, 5300)
  //     })
  // }
  
  crearPartido(){
    this.cont=1;
    console.log("ruteo")
    this.router.navigate(['/altas']);       
  }
  logout(){    
    this.cont=1;   
    this.authService.logOut();
  }

  listado(){
    this.cont=1;   
    console.log("ruteo")
    this.router.navigate(['/listado']);       
  }

  listadoMejores(){
    this.cont=1;   
    console.log("ruteo")
    this.router.navigate(['/listado-mejores']);     
  }

  async presentActionSheet() {
    this.cont=1;   
    const actionSheet = await this.actionSheetController.create({
       buttons: [{
        text: 'Salir',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          
          this.onLogout()

        },
      }]
    });
    await actionSheet.present();
  }

   onLogout(){
    this.cont=1;   
    // localStorage.setItem("perfilMetegol","");
     this.authService.logOut(); 
   }

  ngOnInit() {
    
    this.usu = this.authService.getCurrentUser().email;
    console.log("init de HOME")
    // this.usu = localStorage.getItem("perfilMetegol");
    this.obtenerUsuario();
    this.presentLoading();
  }

  obtenerUsuario(){
    
    // this.usu = localStorage.getItem("perfilMetegol");
    this.usu = this.authService.getCurrentUser().email; 
    this.presentLoading();
    console.log("obtube:",this.usu)

     if (this.usu==undefined){
      console.log("es undefined, vuelvo a login") 
      this.router.navigate(['/login']);  
     }
     else{
      // console.log("no es undefined, vuelvo a login") 
      //   this.usuarioService.getUserById(user.uid)
      //   .subscribe(userData => {  
      //     this.perfil=userData[0].perfil;        
      //     console.log("perfil: ",this.perfil)
      //   })    
      }
      
  }


  // inicio (){
  //   this.router.navigate([`/home`]);
  // }
  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Espere un momento..."
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
