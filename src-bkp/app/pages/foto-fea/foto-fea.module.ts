import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FotoFeaPage } from './foto-fea.page';
import { ComponentModule } from 'src/app/componentes/components.module';

const routes: Routes = [
  {
    path: '',
    component: FotoFeaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentModule
  ],
  declarations: [FotoFeaPage]
})
export class FotoFeaPageModule {}
