import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/clases/partido';
import { ToastController, ModalController, LoadingController } from '@ionic/angular';
import { PartidoService } from 'src/app/servicios/partido.service';
import { ModalDetallePartidoPage } from '../modal-detalle-partido/modal-detalle-partido.page';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
 public listaPartidos :Partido[];
 listaParaMostrar:Partido[];
 public perfil:string;
  constructor(
    public toastController: ToastController,
    private modalController:ModalController,
    private router: Router,
    private partidoService:PartidoService,
    private authService:AuthService,
    private usuarioService:UsuarioService, 
    private loadingController: LoadingController,
  ) { 
    console.log("construcor de listado")
    this.listaParaMostrar = [];

  }

  inicio (){
    this.router.navigate([`/home`]);
  }

  ngOnInit() {
    this.obtenerUsuario();
    this.presentLoading();

    this.partidoService.getAllPartidos().subscribe(data => {
      this.listaPartidos = data;
      this.listaParaMostrar = this.listaPartidos;
      this.listaParaMostrar.sort(this.comparar);
    });
  }


  editar(partido:Partido){
    if(this.perfil=="admin"){
        if(partido.estado == "finalizado"){
          this.mostrarModal(partido);      
        } else {
          this.mostrarModal(partido);          
        }
      }
      else{
        this.mostrarToast("Solo perfil Admin!");

      }
  }

    ///Funciones que llaman al toast y al modal
    async mostrarToast(mensaje:string) {
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 2000
      });
      toast.present();
    }
 async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Espere un momento..."
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
  obtenerUsuario(){
    let user = this.authService.getCurrentUser();
   
    this.usuarioService.getUserById(user.uid)
    .subscribe(userData => {  
      this.perfil=userData[0].perfil;   
      
      console.log("perfil: ",this.perfil)
    })  
  }


  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "bottom",
      color: color
    });
    toast.present();
  }
  async mostrarModal(partido) {
    const modal = await this.modalController.create({
      component: ModalDetallePartidoPage,
      componentProps: {
        partido: partido,
       
      }
    });
    return await modal.present();
  }


  comparar(a, b) {
    if (a.horaPedido > b.horaPedido) return -1; 
    if (b.horaPedido > a.horaPedido) return 1; 
  
    return 0;
  }

}
