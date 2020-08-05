import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { firebaseConfig} from "../environments/environment";
import { AngularFireAuthModule} from "@angular/fire/auth";
import { RouterModule} from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SplashComponent } from './componentes/splash/splash.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
 import {AngularFirestoreModule,FirestoreSettingsToken } from '@angular/fire/firestore';
 import {FotoComponent} from './componentes/foto/foto.component';
import { General } from './general';
import { AngularFireModule } from '@angular/fire';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@NgModule({
  declarations: [AppComponent,SplashComponent,FotoComponent], 
  entryComponents: [FotoComponent],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, AngularFirestoreModule, RouterModule.forRoot([]),
    BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [     
    StatusBar,
    General,
    File,
    SplashScreen,
    Camera,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
