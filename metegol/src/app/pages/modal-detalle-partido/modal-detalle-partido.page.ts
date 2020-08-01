import { Component, OnInit, Input } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { Partido } from 'src/app/clases/partido';
import { PartidoService } from 'src/app/servicios/partido.service';

@Component({
  selector: 'app-modal-detalle-partido',
  templateUrl: './modal-detalle-partido.page.html',
  styleUrls: ['./modal-detalle-partido.page.scss'],
})
export class ModalDetallePartidoPage implements OnInit {
  @Input() partido:Partido;

  constructor(
    private partidoService:PartidoService,
    public modalController: ModalController,
    public toastController: ToastController,

  ) { }

  ngOnInit() {
  }

  async actualizarPartido(partido) {
    console.log("actualizar partido")
    await this.partidoService.updatePartido('partido', this.partido.id, this.partido);

    this.cerrarModal();

  }

  async cerrarModal() {
    await this.modalController.dismiss();
  }
}
