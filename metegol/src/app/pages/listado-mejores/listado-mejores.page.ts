import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/clases/partido';
import { ToastController, ModalController, LoadingController } from '@ionic/angular';
import { ModalDetallePartidoPage } from '../modal-detalle-partido/modal-detalle-partido.page';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { GanadoresService } from 'src/app/servicios/ganadores.service';
import { Ganadores } from 'src/app/clases/ganadores';
@Component({
  selector: 'app-listado-mejores',
  templateUrl: './listado-mejores.page.html',
  styleUrls: ['./listado-mejores.page.scss'],
})
export class ListadoMejoresPage implements OnInit {
  public listaGanadores :Ganadores[];
  listaParaMostrar:Ganadores[];
  mejores: Array<any> = [];
  public perfil:string;
   constructor(
     public toastController: ToastController,
     private modalController:ModalController,
     private router: Router,
     private ganadoresService:GanadoresService,
     private authService:AuthService,
     private usuarioService:UsuarioService, 
     private loadingController: LoadingController,
   ) { 
     console.log("construcor de listado mejores")
     this.listaParaMostrar = [];
 
   }
 
   inicio (){
     this.router.navigate([`/home`]);
   }
 
   ngOnInit() {
     this.obtenerUsuario();
     this.presentLoading();
 
     this.ganadoresService.getAllGanadores().subscribe(data => {
       this.listaGanadores = data;
     
      //  for(let i=0; i<this.listaGanadores.length; i++){
      //    console.log("i", this.listaGanadores[i])
      //    this.mejores.push({"nombre":this.listaGanadores[i], "cantidad":0});

         
      //  }
      //  console.log("-------",this.mejores)    

      this.listaParaMostrar = this.listaGanadores;
      this.listaParaMostrar.sort(this.comparar);
     });
   }
 
 
   editar(partido:Partido){
     if(this.perfil=="admin"){
         if(partido.estado == "finalizado"){
           this.mostrarModal(partido);      
         } else {
           this.mostrarModal(partido);          
         }
       }
       else{
         this.mostrarToast("Solo perfil Admin!");
 
       }
   }
 
     ///Funciones que llaman al toast y al modal
     async mostrarToast(mensaje:string) {
       const toast = await this.toastController.create({
         message: mensaje,
         duration: 2000
       });
       toast.present();
     }
  async presentLoading() {
     const loading = await this.loadingController.create({
       duration: 2000,
       message: "Espere un momento..."
     });
     await loading.present();
 
     const { role, data } = await loading.onDidDismiss();
   }
   obtenerUsuario(){
     let user = this.authService.getCurrentUser();
    
     this.usuarioService.getUserById(user.uid)
     .subscribe(userData => {  
       this.perfil=userData[0].perfil;   
       
       console.log("perfil: ",this.perfil)
     })  
   }
 
 
   async presentToast(message, color) {
     const toast = await this.toastController.create({
       message: message,
       duration: 2000,
       position: "bottom",
       color: color
     });
     toast.present();
   }
   async mostrarModal(partido) {
     const modal = await this.modalController.create({
       component: ModalDetallePartidoPage,
       componentProps: {
         partido: partido,
        
       }
     });
     return await modal.present();
   }
 
 
   comparar(a, b) {
     if (a.cantidad > b.cantidad) return -1; 
     if (b.cantidad > a.cantidad) return 1; 
   
     return 0;
   }
 
 }
 