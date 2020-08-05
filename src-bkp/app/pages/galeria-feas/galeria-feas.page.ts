import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CameraService } from 'src/app/servicios/camera.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { General } from 'src/app/general';
import { ListaImagenesService } from 'src/app/servicios/lista-imagenes.service';
import { votosUsuario } from 'src/app/clases/elemento';


@Component({
  selector: 'app-galeria-feas',
  templateUrl: './galeria-feas.page.html',
  styleUrls: ['./galeria-feas.page.scss'],
})
export class GaleriaFeasPage { 
  images: Array<object>;
  public listaImagenes: any =  [];
  public yaVoto:boolean=false;

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true
  };

  public estaEnPosicionIzquierda: boolean;
  public estaEnPosicionDerecha: boolean;
  public estaEnPosicionHorizontal: boolean;
  public estaEnPosicionVertical: boolean;
  public eventListener;

  private flagLeft: boolean = false;
  private flagRight: boolean = false;

  private posicion;

  public laFoto;
  constructor(
    private cameraService:CameraService, 
    private navCtrl: NavController,
    private general: General,
    private toastController: ToastController,
    private loadingController: LoadingController,
    public listaImagenesService: ListaImagenesService,
  ) {  
    this.estaEnPosicionHorizontal = false;
    this.estaEnPosicionVertical = false;
    this.estaEnPosicionDerecha = false;
    this.estaEnPosicionIzquierda = false;
    this.eventListener = event => {
      this.processOrientation(event);
    };
  }

  ngOnInit() {  
    const elistener = this.eventListener;
    window.addEventListener('deviceorientation', elistener, true);
  }

  ngOnChanges() {
    this.getAllImages()
  }

  getAllImages(){
    this.presentLoading();
    this.listaImagenesService.getListaImagenesFeas().subscribe(listaImagenes => {
           this.listaImagenes=listaImagenes;
           console.log("lista", this.listaImagenes)
           this.posicion=this.listaImagenes[1].nroFoto;
           console.log(this.posicion)
           this.laFoto=this.listaImagenes[1];
           const elistener = this.eventListener;
           window.addEventListener('deviceorientation', elistener, true);
    })

  }

 
  vote(option,image){
    console.log("votarx:", option,image, image.nroFoto)
    this.yaVoto=false;
    let emailUsuario = this.cameraService.getCurrentUser().email;
    console.log("votar",option,image,image.votosusuario)
    for (let i=0; i<image.votosusuario.length;i++){
      if (image.votosusuario[i].email===emailUsuario){        
        this.yaVoto=true;
      }      
    }
    if (this.yaVoto){
      this.presentToast("Ya ha votado esta foto","warning");
    }
    else{// aun no voto
      if(option==1){
        image.votos=image.votos+1;         
      }
      else {
        image.votos=image.votos-1;
      }

      let data: votosUsuario;
      data={email:emailUsuario};
      image.votosusuario.push(data);
      this.cameraService.setDocument('feas',image.id,image)
      this.presentToast("Su voto se ha guardado","success")
    }   
    
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Espere un momento..."
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  private goToHome() {
    this.navCtrl.navigateRoot("/home");
  }


  private processOrientation(event: DeviceOrientationEvent) {
    alert("me movi")
    const beta = event.beta === null ? 0 : Math.round(event.beta);
    const gamma = event.gamma === null ? 0 : Math.round(event.gamma);
 
    console.log("inicio mov");
    if ((beta >= 80 && beta <= 100)) {
      this.goToHome();
    
   } else if (!this.flagLeft && !this.flagRight && (gamma < -50 && gamma >= -70)) {
      this.flagLeft = true;
      this.flagRight = false;
      this.posicion=this.posicion+1;
      this.laFoto=this.listaImagenes[1];
      alert("1"+this.laFoto)
      // this.slides.slidePrev();
    } else if (!this.flagRight && !this.flagLeft && (gamma <= 70 && gamma > 50)) {
      this.flagRight = true;
      this.flagLeft = false;
      this.laFoto=this.listaImagenes[0];
      alert("2"+this.laFoto)
      // this.slides.slideNext().then(() => {});
    } else if (!(gamma <= 70 && gamma > 50) && !(gamma < -50 && gamma >= -70)) {
      this.flagRight = false;
      this.flagLeft = false;
      this.laFoto=this.listaImagenes[2];
      alert("3"+this.laFoto)
    }

  }
    //Si NO estaba en posicion VERTICAL y ahora si 
//     if (!this.estaEnPosicionVertical && (beta >= 80 && beta <= 100)) {
//         let mensaje1="entro en if";
//         this.posicionActualVertical();
//         this.posicionActualDiferenteAHorizontal();      
//     }//Si NO estaba en posicion HORIZONTAL y ahora si  
//     else if (!this.estaEnPosicionHorizontal && (beta >= -10 && beta <= 10)) {
//         let mensaje2="entro en else if" +this.estaEnPosicionHorizontal, beta;
//         this.posicionActualDiferenteAVertical(); 
//         this.posicionActualHorizontal();           
//     }//Si estaba en pocision HORIZONTAL y se movio hacia la IZQUIERDA
//      else if (!this.estaEnPosicionIzquierda && !this.estaEnPosicionDerecha 
//              && this.estaEnPosicionHorizontal && (gamma < -70 && gamma >= -90)) {
//          this.estaEnPosicionIzquierda = true;
//          this.estaEnPosicionDerecha = false;
//         //  this.sonidoLateralIzquierdo.src = "assets/sonido/sonidoIzquierda.mp3";
//         //  this.sonidoLateralIzquierdo.load();
//         //  const playPromise = this.sonidoLateralIzquierdo.play();
//         //  if (playPromise !== null) { playPromise.catch(() => { 
//         //    this.sonidoLateralIzquierdo.play(); }) 
//         //  }
//     } //Si estaba en pocision HORIZONTAL y se movio hacia la DERECHA
//     else if (!this.estaEnPosicionDerecha && !this.estaEnPosicionIzquierda 
//              && this.estaEnPosicionHorizontal && (gamma <= 90 && gamma > 70)) {
//          this.estaEnPosicionDerecha = true;
//          this.estaEnPosicionIzquierda = false;
//         //  this.sonidoLateralDerecho.src = "assets/sonido/sonidoDerecha.mp3";
//         //  this.sonidoLateralDerecho.load();
//         //  const playPromise = this.sonidoLateralDerecho.play();
//         //  if (playPromise !== null) { playPromise.catch(() => {
//         //     this.sonidoLateralDerecho.play(); }) 
//         //  }
//     }//Si estaba en pocision HORIZONTAL 
//      else if (this.estaEnPosicionHorizontal && (beta >= -10 && beta <= 10)
//               && !(gamma <= 90 && gamma > 70) && !(gamma < -70 && gamma >= -90)) {
//       this.estaEnPosicionDerecha = false;
//       this.estaEnPosicionIzquierda = false;
//     }
//   }

//   private posicionActualDiferenteAHorizontal() {
//     this.estaEnPosicionIzquierda = false;
//     this.estaEnPosicionDerecha = false;

//   }

//   //Detecta que se movio horizontalmente y comienza a vibrar
//   private posicionActualHorizontal() {
//       this.estaEnPosicionHorizontal = true;
//       this.estaEnPosicionVertical = false;
//       this.estaEnPosicionIzquierda = false;
//       this.estaEnPosicionDerecha = false;

//   }

//   private posicionActualDiferenteAVertical() {
//     this.estaEnPosicionIzquierda = false;
//     this.estaEnPosicionDerecha = false;
//     this.estaEnPosicionVertical = false;
//   }
//   private posicionActualVertical() {
//     this.estaEnPosicionVertical = true;
//     this.estaEnPosicionHorizontal = false;
//     this.estaEnPosicionIzquierda = true;
//     this.estaEnPosicionDerecha = true;
//     // this.flashlight.switchOn();
//     // timer(5000).subscribe( () => {
//     //   this.flashlight.switchOff();
//     // });
//     // this.sonidoVertical.src = "assets/sonido/sonidoVertical.mp3";
//     // this.sonidoVertical.load();
//     // const playPromise = this.sonidoVertical.play();
//     // if (playPromise !== null) {
//     //     playPromise.catch(() => {
//     //       timer(5000).subscribe(() => this.sonidoVertical.play())
//     //     })
//     // }
// }
}
