import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/clases/partido';
import { ToastController, ModalController } from '@ionic/angular';
import { PartidoService } from 'src/app/servicios/partido.service';
import { ModalDetallePartidoPage } from '../modal-detalle-partido/modal-detalle-partido.page';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

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
    private partidoService:PartidoService,
    private authService:AuthService,
    private usuarioService:UsuarioService,
  ) { 
    this.listaParaMostrar = [];
  }

  ngOnInit() {

    this.partidoService.getAllPartidos().subscribe(data => {
      this.listaPartidos = data;
      this.listaParaMostrar = this.listaPartidos;
      this.listaParaMostrar.sort(this.comparar);
    });
  }
  editar(partido:Partido){

    if(partido.estado == "finalizado"){
      this.mostrarModal(partido);      
    } else {
      this.mostrarModal(partido);
    }
  }


  obtenerUsuario(){
    let user = this.authService.getCurrentUser();
   
    this.usuarioService.getUserById(user.uid)
    .subscribe(userData => {  
      this.perfil=userData[0].perfil;   
      
      console.log(this.perfil)
    })  
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
