import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

  private error: String;

  constructor(private route: ActivatedRoute) { 
    this.error = this.route.snapshot.params['error'];
  }

  ngOnInit() {
  }

}