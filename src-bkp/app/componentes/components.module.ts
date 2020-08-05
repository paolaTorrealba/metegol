import { NgModule } from '@Angular/core';
import { IonicModule } from '@ionic/angular';
import { CameraComponent } from './camera/camera.component';
@NgModule({
  declarations: [CameraComponent],
  exports: [CameraComponent],
  imports: [IonicModule]
})
export class ComponentModule  {

  constructor() { }

  ngOnInit() {}

}
