import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-segunda',
  templateUrl: './segunda.page.html',
  styleUrls: ['./segunda.page.scss'],
})
export class SegundaPage  {
  imageURL
  constructor(private camera: Camera) {}

fotoNOK(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    //let base64Image = 'data:image/jpeg;base64,' + imageData;  
    this.imageURL = imageData    
    }, (err) => {
    // Handle error
    });  
}
}