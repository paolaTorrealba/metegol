import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonSlides, NavController, ToastController, LoadingController } from '@ionic/angular';
import { General } from 'src/app/general';
import { CameraService } from 'src/app/servicios/camera.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {

  @Input() actualizarListado: string;
  @ViewChild('slides',{static: false}) slides:IonSlides;
  images: Array<object>;
  private eventListener;
  private flagLeft: boolean = false;
  private flagRight: boolean = false;

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(
    private cameraService:CameraService, 
    private navCtrl: NavController,
    private general: General,
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) { 
    this.eventListener = event => {
      this.processOrientation(event);
    };
  }

  ngOnInit() {
    window.addEventListener('deviceorientation', this.eventListener, true);
  }

  ngOnChanges() {
    this.getAllImages()
  }

  getAllImages(){
    this.presentLoading();
    this.images = new Array<object>(); 
    this.cameraService.getAllImages(this.general.type).then((images: firebase.storage.ListResult) => {
      images.items.forEach((image:firebase.storage.Reference) => {
        Promise.all([image.getDownloadURL(),this.cameraService.getOnce("images", image.name), this.cameraService.getOnce("votos", image.name) ]).then(values => {
          this.images.push({"url": values[0], "name": image.name, "date":values[1].get("date"), "usuario": values[1].get("usuario"), "votos":values[2].get("votos") || 0});
          this.images.sort((a:any,b:any) => (a.date > b.date) ? -1 : 1);
        })
      })
    }).catch(() => {
      this.navCtrl.navigateRoot("login");
    })
  }

  //Al votar piso el utimo usuario que voto la foto y el anterior puede volver a votar
  vote(option){
    this.slides.getActiveIndex().then(index =>{
      let imageName = this.images[index]["name"];
      this.cameraService.getOnce("votos", imageName).then(actualVotos =>{
        let votos = actualVotos.get("votos") || 0
        if(actualVotos.get("usuario") != this.cameraService.getCurrentUser().uid){
          if(option == 0){
            this.cameraService.setDocument("votos",imageName,{"votos": votos - 1, "usuario": this.cameraService.getCurrentUser().uid});
          }
          else if(option == 1){
            this.cameraService.setDocument("votos",imageName,{"votos": votos + 1, "usuario": this.cameraService.getCurrentUser().uid});
          }
          this.presentToast("El voto ha sido registrado","success");
          this.getAllImages();
        }
        else{
          this.presentToast("Ya ha votado esta foto","warning");
        }
      });
    });
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "top",
      color: color
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Buscando imagenes"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  private goToHome() {
    this.navCtrl.navigateRoot("/home");
  }

  private processOrientation(event: DeviceOrientationEvent) {
    const beta = event.beta === null ? 0 : Math.round(event.beta);
    const gamma = event.gamma === null ? 0 : Math.round(event.gamma);
    if ((beta >= 80 && beta <= 100)) {
      this.goToHome();
    } else if (!this.flagLeft && !this.flagRight && (gamma < -50 && gamma >= -70)) {
      this.flagLeft = true;
      this.flagRight = false;
      this.slides.slidePrev();
    } else if (!this.flagRight && !this.flagLeft && (gamma <= 70 && gamma > 50)) {
      this.flagRight = true;
      this.flagLeft = false;
      this.slides.slideNext().then(() => {});
    } else if (!(gamma <= 70 && gamma > 50) && !(gamma < -50 && gamma >= -70)) {
      this.flagRight = false;
      this.flagLeft = false;
    }
  }

}