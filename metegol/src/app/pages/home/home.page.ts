import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { LoadingController, ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public perfil:string;
  public usu:string;
  constructor(
    public router: Router,
    private authService:AuthService,
    public actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private usuarioService:UsuarioService, 
  ) { 
    this.obtenerUsuario();
    this.presentLoading();
    console.log("constructor de HOME")
    this.usu = localStorage.getItem('metegol');
   console.log("usu",this.usu)
   console.log("perfil ", this.perfil)
  }

  crearPartido(){
    console.log("ruteo")
    this.router.navigate(['/altas']);       
  }
  logout(){      
    this.authService.logOut();
  }

  listado(){
    console.log("ruteo")
    this.router.navigate(['/listado']);       
  }

  listadoMejores(){
    console.log("ruteo")
    this.router.navigate(['/listado-mejores']);     
  }

  async presentActionSheet() {
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
  this.authService.logOut(); 
   }
  ngOnInit() {
    console.log("init de HOME")
    this.obtenerUsuario();
    this.presentLoading();
  }

  obtenerUsuario(){
    
    let user = this.authService.getCurrentUser(); 
    this.presentLoading();
    console.log("obtener usu",user) 
     if (user==undefined){
      this.router.navigate(['/login']);  
     }
     else{
        this.usuarioService.getUserById(user.uid)
        .subscribe(userData => {  
          this.perfil=userData[0].perfil;        
          console.log("perfil: ",this.perfil)
        })    
      }
      
  }


  inicio (){
    this.router.navigate([`/home`]);
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Espere un momento..."
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
