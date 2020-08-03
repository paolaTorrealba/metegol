import { Component, OnInit, Input } from '@angular/core';
import { ToastController, ModalController, LoadingController, NavController } from '@ionic/angular';
import { Partido } from 'src/app/clases/partido';
import { PartidoService } from 'src/app/servicios/partido.service';
import { CameraService } from 'src/app/servicios/camera.service';
import { GanadoresService } from 'src/app/servicios/ganadores.service';
import { Ganadores } from 'src/app/clases/ganadores';

@Component({
  selector: 'app-modal-detalle-partido',
  templateUrl: './modal-detalle-partido.page.html',
  styleUrls: ['./modal-detalle-partido.page.scss'],
})
export class ModalDetallePartidoPage implements OnInit {
  @Input() partido:Partido;
  public listaGanadores :Ganadores[];
  public contador: number=0;
  public ganador:Ganadores;

  constructor(
    private navCtrl: NavController,
    public ganadoresService :GanadoresService,
    private partidoService:PartidoService,
    public modalController: ModalController,
    public toastController: ToastController,
    private camaraService: CameraService,
    private loadingController: LoadingController,

  ) { 
    console.log("construcor de MODAL", this.partido)
    if(this.partido==undefined){
      this.navCtrl.navigateForward('/home');
    }

  }

  ngOnInit() {
    this.ganadoresService.getAllGanadores().subscribe(data => {
      this.listaGanadores = data;      
    });
    
  }


  contarJugadas(jugador){
    console.log("contarJugadas de ", jugador)
    this.contador=0;
    for(let i=0; i<this.listaGanadores.length; i++){
       if (this.listaGanadores[i].nombreGanador==jugador){
         this.ganador=this.listaGanadores[i]
         console.log("contador", this.contador)
         this.contador = this.listaGanadores[i].cantidad +1;
         console.log("contador", this.contador)
       }       
    }
      }
  async actualizarPartido(partido) {
    console.log(partido)
    this.partido.estado="finalizado"
    console.log("actualizar partido", this.partido)
    await this.partidoService.updatePartido('partido', this.partido.id, this.partido);
    if (this.partido.ganador!=""){
      console.log("guardo ganador", this.partido.ganador)
       this.contarJugadas(this.partido.ganador);
       if (this.contador>0){
        this.ganador.nombreGanador=this.partido.ganador;
        this.ganador.cantidad=this.contador;
        console.log("actualice  ganador ",this.ganador)
        this.ganadoresService.updateGanadores('ganadores', this.ganador.id, this.ganador);
       }else{
         console.log("guardo un nuevo ganador en 1")
        let data = new Ganadores();
        data.nombreGanador=this.partido.ganador;
        data.cantidad=this.contador +1;
        this.ganadoresService.saveGanadores(data);
       }
     
    }
    
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
