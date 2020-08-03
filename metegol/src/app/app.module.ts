import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule} from "@angular/fire/auth";
import { firebaseConfig } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule } from '@angular/fire/firestore';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import {ModalDetallePartidoPageModule} from  './pages/modal-detalle-partido/modal-detalle-partido.module';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule, 
    AngularFireAuthModule,
    ModalDetallePartidoPageModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    File,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy,
       useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
