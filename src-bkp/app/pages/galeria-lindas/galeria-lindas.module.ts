import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GaleriaLindasPage } from './galeria-lindas.page';
import { SlideComponent } from 'src/app/componentes/slide/slide.component';

const routes: Routes = [
  {
    path: '',
    component: GaleriaLindasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GaleriaLindasPage,SlideComponent]
})
export class GaleriaLindasPageModule {}
