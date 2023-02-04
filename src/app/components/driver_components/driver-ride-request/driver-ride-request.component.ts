import { Component, Input } from '@angular/core';
import { AcceptRideService } from 'src/app/services/accept-ride.service';

@Component({
  selector: 'app-driver-ride-request',
  templateUrl: './driver-ride-request.component.html',
  styleUrls: ['./driver-ride-request.component.css']
})
export class DriverRideRequestComponent {
  @Input() ride: any;
  showModal: boolean = false;

  constructor(private acceptRideService: AcceptRideService) { }

  acceptRide() {
    this.acceptRideService.acceptRide()
    this.hide();
  }

  declineRide() {
    this.acceptRideService.declineRide()
    this.hide();
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }
}
