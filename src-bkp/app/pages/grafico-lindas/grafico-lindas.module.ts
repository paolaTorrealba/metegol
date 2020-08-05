import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GraficoLindasPage } from './grafico-lindas.page';

const routes: Routes = [
  {
    path: '',
    component: GraficoLindasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GraficoLindasPage]
})
export class GraficoLindasPageModule {}
