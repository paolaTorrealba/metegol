import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public perfil:string;
  constructor(
    public router: Router,
    private authService:AuthService,
    private loadingController: LoadingController,
    private usuarioService:UsuarioService, 
  ) { 
    console.log()
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
  ngOnInit() {
    this.obtenerUsuario();
    this.presentLoading();
  }

  obtenerUsuario(){
    let user = this.authService.getCurrentUser();  
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
