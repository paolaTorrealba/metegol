import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.scss'],
})
export class BotonesComponent implements OnInit {

  @Input() type: string;
  @Input() photoUrl: string;
  @Input() destinationUrl: string
  
  constructor(private router: Router) { }

  ngOnInit() {}

  goTo(){
    console.log("ruta desde botones","/main", {"type": this.type})
    this.router.navigate(["/main", {"type": this.type}]);
  }

}