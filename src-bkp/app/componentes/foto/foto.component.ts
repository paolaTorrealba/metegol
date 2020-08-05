import { Component, OnInit } from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';
@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.scss'],
})
export class FotoComponent implements OnInit {
  public nombreUsuario: string;
  public img : string;

  constructor(private navParams : NavParams, private modal: ModalController) { }

  ngOnInit() {
  this.nombreUsuario = this.navParams.get('nombreUsuario');
  this.img = this.navParams.get('img');
  }
  closeFoto(){
    this.modal.dismiss();
  }

}
