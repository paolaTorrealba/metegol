  
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { General } from 'src/app/general';
import { CameraService } from 'src/app/servicios/camera.service';
import { ListaImagenesService } from 'src/app/servicios/lista-imagenes.service';

@Component({
  selector: 'app-lista-feas',
  templateUrl: './lista-feas.page.html',
  styleUrls: ['./lista-feas.page.scss'],
})
export class ListaFeasPage implements OnInit {
  public listaImagenes: any =  [];
  public listaOrdenada: any =  [];
  images: Array<object>;
  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(
    private cameraService:CameraService, 
    private navCtrl: NavController, 
    private general: General,
    private loadingController: LoadingController,
    public listaImagenesService: ListaImagenesService,
  ) { }

  ngOnInit() {
    this.getAllImages();
  }

  getAllImages(){
    this.presentLoading();
    this.listaImagenesService.getListaImagenesFeas().subscribe(listaImagenes => {
           this.listaImagenes=listaImagenes;
           console.log("lista", this.listaImagenes)
           this.ordenarLista();
    })
  }

  ordenarLista(){
  this.listaOrdenada =  this.listaImagenes
  .sort(function(a,b){
    console.log(a.date.nroFoto)
    return  b.nroFoto - a.nroFoto});  
    console.log("ordenada",this.listaOrdenada)
  }
  // getAllImages(){
  //   this.presentLoading();
  //   this.images = new Array<object>()
  //   this.cameraService.getCurrentUser;
  //   this.cameraService.getAllImages(this.general.type).then((images: firebase.storage.ListResult) => {
  //     images.items.forEach((image:firebase.storage.Reference) => {
  //       Promise.all([image.getDownloadURL(),this.cameraService.getOnce("images", image.name), this.cameraService.getOnce("votos", image.name) ]).then(values => {
  //         if(values[1].get("usuario") == this.cameraService.getCurrentUser().email.split('@')[0]){
  //           this.images.push({"url": values[0], "name": image.name, "date":values[1].get("date"), "usuario": values[1].get("usuario"), "votos":values[2].get("votos") || 0});
  //           this.images.sort((a:any,b:any) => (a.date > b.date) ? -1 : 1);
  //         }
  //       })
  //     })
  //   }).catch(() => {
  //     this.navCtrl.navigateRoot("login");
  //   })
  // }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Buscando imagenes"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}