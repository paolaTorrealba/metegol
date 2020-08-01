import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalDetallePartidoPage } from './modal-detalle-partido.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetallePartidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalDetallePartidoPage]
})
export class ModalDetallePartidoPageModule {}
