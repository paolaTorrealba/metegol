
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { General } from 'src/app/general';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit {

  private urlGallery:string = "/main/galeria/";
  private urlCamera:string = "/main/camera/";
  private urlChart:string = "/main/grafico/";
  private urlList:string = "/main/lista/";

  constructor(
    private router: Router,
    private general: General) {
  }

  ngOnInit() { 
  }

  goTo(option){
    console.log("options", option)
    if(option == "camera"){
      this.router.navigateByUrl(this.urlCamera +  this.general.type);
    }
    else if(option == "gallery"){
      console.log("opcion:", option, this.urlGallery)
      this.router.navigateByUrl(this.urlGallery +this.general.type);
    }
    else if(option == "chart"){
      this.router.navigateByUrl(this.urlChart + this.general.type);
    }
    else if(option == "list"){
      console.log(this.urlList + this.general.type)
      this.router.navigateByUrl(this.urlList + this.general.type);
    }
  }
}