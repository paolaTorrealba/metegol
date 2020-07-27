import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/servicios/camera.service';
import { ToastController } from '@ionic/angular';
import { General } from 'src/general';
import { ListaImagenesService } from 'src/app/servicios/lista-imagenes.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  public listaImagenesFeas: any =  [];
  public listaImagenesLindas: any =  [];
  private type: any;
  public url:any;
  
  constructor(private cameraService: CameraService,
    private toastController: ToastController,
    public listaImagenesService: ListaImagenesService,

    private general: General,) { 
    this.type = this.general.type
  }

  ngOnInit() {}

  traerFeas(){
    this.listaImagenesService.getListaImagenesFeas().subscribe(listaImagenes => {
      this.listaImagenesFeas=listaImagenes;
    })
  }

  traerLindas(){
    this.listaImagenesService.getListaImagenesLindas().subscribe(listaImagenes => {
      this.listaImagenesLindas=listaImagenes;
    })
  }
  
  takePhoto(){
    console.log("takePhoto ", this.type)
    if (this.type=='lindas'){
       this.traerLindas();
       this.cameraService.tomarFoto(this.type, Date.now())
        .then( urlFoto => {     
            this.url = urlFoto;
            this.cameraService.guardarConUsuario(this.type, this.url, this.listaImagenesLindas.length);
        });       
    }
    else{
        this.traerFeas();
        this.cameraService.tomarFoto(this.type, Date.now())
           .then( urlFoto => {     
              this.url = urlFoto;
              this.cameraService.guardarConUsuario(this.type, this.url, this.listaImagenesFeas.length);
        }); 
     }
     if(this.url!=undefined){
       this.presentToast("La foto se ha guardo con éxito","success");
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
}
