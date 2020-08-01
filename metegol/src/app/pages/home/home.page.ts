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
  ) { }

  crearPartido(){
    console.log("ruteo")
    this.router.navigate(['/altas']);       
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
    this.usuarioService.getUserById(user.uid)
    .subscribe(userData => {  
      this.perfil=userData[0].perfil;        
      console.log("perfil: ",this.perfil)
    })  
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
