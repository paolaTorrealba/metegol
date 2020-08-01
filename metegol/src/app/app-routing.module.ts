import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  // {
  //   path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  // { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
  { path: 'listado', loadChildren: './pages/listado/listado.module#ListadoPageModule' },
  { path: 'altas', loadChildren: './pages/altas/altas.module#AltasPageModule' },
  { path: 'modal-detalle-partido', loadChildren: './pages/modal-detalle-partido/modal-detalle-partido.module#ModalDetallePartidoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
