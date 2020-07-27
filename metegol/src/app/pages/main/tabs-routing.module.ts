import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
  { path: '', component: MainPage, children: [
    // { path: 'galeria/lindas', loadChildren: 'src/app/pages/galeria-lindas/galeria-lindas.module#GaleriaLindasPageModule' },
    // { path: 'galeria/feas', loadChildren: 'src/app/pages/galeria-feas/galeria-feas.module#GaleriaFeasPageModule' },
    // { path: 'camera/lindas', loadChildren: 'src/app/pages/foto-linda/foto-linda.module#FotoLindaPageModule' },
    // { path: 'camera/feas', loadChildren: 'src/app/pages/foto-fea/foto-fea.module#FotoFeaPageModule' },
    // { path: 'grafico/lindas', loadChildren: 'src/app/pages/grafico-lindas/grafico-lindas.module#GraficoLindasPageModule' },    
    // { path: 'grafico/feas', loadChildren: 'src/app/pages/grafico-feas/grafico-feas.module#GraficoFeasPageModule' },
    // { path: 'lista/lindas', loadChildren: 'src/app/pages/lista-lindas/lista-lindas.module#ListaLindasPageModule' },
    { path: 'listado', loadChildren: 'src/app/pages/listado/listado.module#ListadoPageModule' },        
    { path: 'home', redirectTo: '/home' },
    { path: 'altas', loadChildren: 'src/app/pages/altas/altas.module#AltasPageModule' },        

    // { path: 'camera/', loadChildren: 'src/app/pages/foto-fea/foto-fea.module#FotoFeaPageModule' },
    // { path: 'grafico/', loadChildren: 'src/app/pages/grafico-lindas/grafico-lindas.module#GraficoLindasPageModule' },    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }