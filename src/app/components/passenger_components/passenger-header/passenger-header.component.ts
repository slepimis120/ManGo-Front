import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-passenger-header',
  templateUrl: './passenger-header.component.html',
  styleUrls: ['./passenger-header.component.css']
})
export class PassengerHeaderComponent {

  constructor(private router: Router) { }

  rideHistory(){
    this.router.navigate(['passenger/history']);
  }
  

}
