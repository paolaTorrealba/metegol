import { Component, OnInit } from '@angular/core';
import { General } from 'src/general';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit {

  private urlAltas:string = "/main/altas";
  private urlListado:string = "/main/listado/";

  constructor(
    private router: Router,
    private general: General) {
  }

  ngOnInit() { 
  }

  goTo(option){
    console.log("options", option)
    if(option == "altas"){
      this.router.navigateByUrl(this.urlAltas +  this.general.type);
    }      
    else if(option == "listado"){
      console.log(this.urlListado + this.general.type)
      this.router.navigateByUrl(this.urlListado+ this.general.type);
    }
  }
}