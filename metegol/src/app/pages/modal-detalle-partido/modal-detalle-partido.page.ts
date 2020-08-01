import { Component, OnInit, Input } from '@angular/core';
import { ToastController, ModalController, LoadingController, NavController } from '@ionic/angular';
import { Partido } from 'src/app/clases/partido';
import { PartidoService } from 'src/app/servicios/partido.service';
import { CameraService } from 'src/app/servicios/camera.service';

@Component({
  selector: 'app-modal-detalle-partido',
  templateUrl: './modal-detalle-partido.page.html',
  styleUrls: ['./modal-detalle-partido.page.scss'],
})
export class ModalDetallePartidoPage implements OnInit {
  @Input() partido:Partido;

  constructor(
    private navCtrl: NavController,
    private partidoService:PartidoService,
    public modalController: ModalController,
    public toastController: ToastController,
    private camaraService: CameraService,
    private loadingController: LoadingController,

  ) { 

    if(this.partido==undefined){
      this.navCtrl.navigateForward('/login');
    }
    console.log("construcor de modal")
  }

  ngOnInit() {
  }

  async actualizarPartido(partido) {
    console.log(partido)
    this.partido.estado="finalizado"
    console.log("actualizar partido", this.partido)
    await this.partidoService.updatePartido('partido', this.partido.id, this.partido);

    this.cerrarModal();

  }

  async cerrarModal() {
    await this.modalController.dismiss();
  }

  tomarFoto(){   
    // this.camaraService.tomarFoto('mesas', Date.now());
    this.camaraService.tomarFoto('partido', Date.now()).then( urlFoto => {
         this.partido.foto = urlFoto;
         this.presentLoading();
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

  

}
