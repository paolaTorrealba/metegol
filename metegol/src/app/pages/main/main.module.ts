import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { TabBarComponent } from 'src/app/componentes/tab-bar/tab-bar.component';
import { TabsRoutingModule } from './tabs-routing.module';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TabsRoutingModule
  ],
  declarations: [MainPage, TabBarComponent]
})
export class MainPageModule {}
