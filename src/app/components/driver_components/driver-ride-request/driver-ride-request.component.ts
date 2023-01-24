import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-driver-ride-request',
  templateUrl: './driver-ride-request.component.html',
  styleUrls: ['./driver-ride-request.component.css']
})
export class DriverRideRequestComponent {
  @Input() ride: any;
  showModal: boolean = false;

  acceptRide() {
    // code to handle ride acceptance
  }

  declineRide() {
    // code to handle ride decline
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }
}
