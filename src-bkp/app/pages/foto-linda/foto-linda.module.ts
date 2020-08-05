import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FotoLindaPage } from './foto-linda.page';
import { ComponentModule } from 'src/app/componentes/components.module';

const routes: Routes = [
  {
    path: '',
    component: FotoLindaPage
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
  declarations: [FotoLindaPage]
})
export class FotoLindaPageModule {}
