import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes , Router} from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
  { path: 'error', loadChildren: './pages/error/error.module#ErrorPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },  { path: 'error', loadChildren: './pages/error/error.module#ErrorPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router: Router) { }
}
