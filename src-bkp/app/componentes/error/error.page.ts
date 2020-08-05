import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {
  email: string;
  password: string;
  constructor( private authService:AuthService, public router: Router) {}

  ngOnInit() {
  }
  
  onSubmitLogin(){
    //console.log("estas en la fucion")
    this.authService.login(this.email,this.password).then (res => {
        this.router.navigate(['/home']);

       
  }).catch(err => this.router.navigate(['/error'])); 
   
  }

}
