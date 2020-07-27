import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { File } from "@ionic-native/file/ngx";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotificationService } from './notification.service';
import { ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Elemento } from '../clases/elemento';


@Injectable({
  providedIn: 'root'
})
export class CameraService {
  currentImage: any;
  imageURL
  public sala;
  private dispositivo="mobile";//cambiar para probar en web

  private imagenes: Array<any>;
  public imgUrl:any;
  
  public firebase = firebase;
  constructor(
    private camera: Camera, 
    private file: File,
    private toastController: ToastController,
    private afs: AngularFirestore, 
    private afsAuth: AngularFireAuth,   
    private notificationService: NotificationService,

  ) {   

    this.imagenes = new Array<object>();

  }
 async tomarFoto(tipo,imageName):Promise<string> {  
   let options: CameraOptions = {
      quality: 80,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE
    };
    return new Promise(async (resolve, reject) => {
      
      try {
        let result = await this.camera.getPicture(options);
        let image = `data:image/jpeg;base64,${result}`;
        //guardo en Firebase Storage
        let pictures = firebase.storage().ref(`${tipo}/${imageName}`);
        //tomo url de foto en Firebase Storage
        pictures.putString(image, "data_url").then(() => {
          pictures.getDownloadURL().then((url) => {
            // alert("Foto guardada con éxito: " + url );
            resolve(url);
          });  
        }); 
       
      } catch (error) {
        alert(error);
        reject(error)
      }

    })
}

  guardarConUsuario(tipo,url,nro){
    console.log("guardo foto con datos", url, )
    let foto = new Elemento();
    foto.email = this.getCurrentUser().email;
    foto.img= url;
    foto.nroFoto=nro+1;
    foto.votos =0;
    // foto.nombre=this.getCurrentUser().nombre;
    foto.votosusuario=[];
    foto.date= new Date();

    this.saveFoto(tipo,foto);
    // this.presentToast("El voto ha sido registrado","success");
    // alert("Foto guardada con éxito: " + url );

   
  }


  saveFoto(tipo, item) {  
    console.log(item, item.url) 
    return this.afs.collection(tipo).add(Object.assign({}, item));
  }
  getImageByName(collection, imageName) {
    console.log(firebase.storage().ref(`${collection}/${imageName}`).getDownloadURL())
    return firebase.storage().ref(`${collection}/${imageName}`).getDownloadURL();
  }

  getAllImages(type){
    console.log("getAllImages",type)
    return new Promise((resolve, reject) => {
      resolve(firebase.storage().ref("images").child(type).listAll());
    })
  }

  setDocument(collection:string, id:string, object:object): void {
    console.log("setDoc ",collection, id, object)
    this.afs.collection(collection).doc(id).set(object);
  }

  getOnce(collection, id){
    return this.afs.collection(collection).doc(id).get().toPromise();
  }

  getCurrentUser(){
    return this.afsAuth.auth.currentUser;
  }

  getObservableFromDocument(collection, id){
    return this.afs.collection(collection).doc(id).valueChanges();
  }
}