import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Partido } from 'src/app/clases/partido';
import { PartidoService } from 'src/app/servicios/partido.service';
import { LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/servicios/toast.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.page.html',
  styleUrls: ['./altas.page.scss'],
})
export class AltasPage implements OnInit {

  form: NgForm;
  diaMinimo:Date;
  diaMaximo:Date;
  fecha:string;
  hora:string;
  esMismoDia:boolean;
  horasPartidoDiaCorriente:string[];
  mesesAbreviados:string[];
  public perfil:string;

  public partido : Partido;
  constructor(
    public partidoService :PartidoService,
    private loadingController: LoadingController,
    private toastService:ToastService,
    private authService:AuthService,
    private usuarioService:UsuarioService, 
    private router: Router,
  ) {
    console.log("construcor de altas")
    this.horasPartidoDiaCorriente = [];
    this.mesesAbreviados = ["ene", "feb", "mar", "abr", "may", "jun",
      "jul", "ago", "sep", "oct", "nov", "dic"];
    this.esMismoDia = false;

  this.partido = new Partido();
  
   }

  ngOnInit() {

    this.obtenerUsuario();
    this.presentLoading();

    this.diaMinimo = new Date();
    this.diaMaximo = new Date();
    this.diaMaximo.setDate(this.diaMinimo.getDate() + 15);
    
  }

  obtenerUsuario(){
    let user = this.authService.getCurrentUser();
   
    this.usuarioService.getUserById(user.uid)
    .subscribe(userData => {  
      this.perfil=userData[0].perfil;   
      
      console.log("perfil: ",this.perfil)
    })  
  }
  async registrar(){   
    this.partido.estado="pendiente";
    this.partido.fecha = new Date(this.fecha);
    let auxHora= new Date(this.hora);
    this.partido.fecha.setHours(auxHora.getHours(),auxHora.getMinutes(), 0, 0);
   
    console.log("registro", this.partido)
    this.partidoService.saveJugadores(this.partido);
    this.presentLoading();
    this.toastService.mostrarToast('Partido Registrado correctamente', 'success')

    this.router.navigateByUrl('/home');    
  }
  


  calcularHora() {
    let fechaActual:Date = new Date();
    let fechaSeleccionada:Date = new Date(this.fecha);
    
    fechaActual.setHours(0,0,0,0);
    fechaSeleccionada.setHours(0,0,0,0);

    //Calcular horarios disponibles para el mismo día
    if(fechaSeleccionada.getTime() === fechaActual.getTime()) {
      let horaActual = new Date();
      let hora = horaActual.getHours();
      if(hora < 8) {
        hora= 8;
      }
      while(hora <= 24){

        hora+=1
        this.horasPartidoDiaCorriente.push(hora.toString())
      }
      this.esMismoDia = true;
    } else {
      this.esMismoDia = false;
    } 
    console.log(this.horasPartidoDiaCorriente)
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Espere un momento..."
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
