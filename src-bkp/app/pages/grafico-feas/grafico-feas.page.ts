  
import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { LoadingController } from '@ionic/angular';
import { NotificationService } from 'src/app/servicios/notification.service';
import { General } from 'src/app/general';
import { CameraService } from 'src/app/servicios/camera.service';
import { ListaImagenesService } from 'src/app/servicios/lista-imagenes.service';


@Component({
  selector: 'app-grafico-feas',
  templateUrl: './grafico-feas.page.html',
  styleUrls: ['./grafico-feas.page.scss'],
})
export class GraficoFeasPage {
  @ViewChild('chart', {static: false}) chart;

  bars: any;
  colors: Array<string>;
  images: Array<object>;
  labels: Array<string>;
  data: Array<string>;
  imageObject: object;
  public listaImagenes: any =  [];
  constructor(
    private cameraService:CameraService,    
    public loadingController: LoadingController,
    private general: General,
    private notificationService: NotificationService,
    public listaImagenesService: ListaImagenesService,
  ) { }

  ionViewDidEnter() {
    this.getAllImages().then(() => {
      this.createChart();
    });  
  }

  createChart() {
    this.bars = new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Cantidad de votos',
          data: this.data,
          backgroundColor: this.colors,
          borderColor: this.colors,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }

  
  getAllImages(){
    this.notificationService.presentLoading(2000, "Espere un momento...");
    
    this.initiateArrays();

    return new Promise((resolve) => {
      this.listaImagenesService.getListaImagenesFeas()
        .subscribe(listaImagenes => {
          this.listaImagenes=listaImagenes;
          console.log("lista", this.listaImagenes)
          this.listaImagenes.forEach(item => {

            let imageName = item.email;
            console.log("item",item)
            if( item.votos > 0){
              this.images.push({"url": item.img, "date":item.date, "usuario": item.email, "votos": item.votos});
                    this.labels.push(imageName);      
                    this.data.push(item.votos);
                    console.log("this.data",this.data)
                    this.colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
                    setTimeout(function() { resolve() }, 1000);
             }
                    // let votos = values[2].get("votos") || 0;
                    // if(votos > 0){
                    // this.images.push({"url": values[0], "name": imageName, "date":values[1].get("date"), "usuario": values[1].get("usuario")});
                    // this.labels.push(imageName);
                    // this.data.push(values[2].get("votos"));
                    // this.colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
                    // setTimeout(function() { resolve() }, 1000);
            
             })
  
           });

          });
        }

    
       



      // this.cameraService.getAllImages(this.general.type)
      // .then((images: firebase.storage.ListResult) => {
      //   images.items.forEach((image:firebase.storage.Reference) => {
      //     let imageName = image.name;
          
          
  //         Promise.all([image.getDownloadURL(),
  //           this.cameraService.getOnce("images", imageName),
  //           this.cameraService.getOnce("votos", imageName)
  //         ]).then(values => {
  //           let votos = values[2].get("votos") || 0;
  //           if(votos > 0){
  //             this.images.push({"url": values[0], "name": imageName, "date":values[1].get("date"), "usuario": values[1].get("usuario")});
  //             this.labels.push(imageName);
  //             this.data.push(values[2].get("votos"));
  //             this.colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
  //             setTimeout(function() { resolve() }, 1000);
  //           }
  //         })
  //       })
  //     })
  //   })
  // }

  initiateArrays(){
    this.images = []; 
    this.labels = [];
    this.data = [];
    this.colors = [];
  }

  showImage(event){
    let element = this.bars.getElementAtEvent(event)[0];
    if(element) {
      let elementName = this.labels[element._index];   
      this.imageObject = this.images
          .filter((data:any) => data.usuario == elementName)[0];
     
    }
  }
}