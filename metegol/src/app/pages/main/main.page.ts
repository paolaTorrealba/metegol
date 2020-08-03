import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { General } from 'src/general';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  private type:string;

  constructor(private route: ActivatedRoute,
    private general: General,
     private router: Router) {
       console.log("constructor de main")
    this.type = this.route.snapshot.params['type'];
    if(this.type){
      this.general.type = this.type;
      console.log("this.router.navigateByUrl", this.type, "/main/altas/")
      this.router.navigateByUrl("/main/altas");

    }
  }

  ngOnInit() {
    console.log("init de main")
  }
}