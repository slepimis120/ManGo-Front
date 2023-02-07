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
  declined : boolean = false;

  constructor(private acceptRideService: AcceptRideService) { }

  acceptRide() {
    this.acceptRideService.acceptRide()
    this.hide();
  }

  declineRide(reason : string) {
    if(reason.length < 5){
      this.declined = true;
      
    }else{
      this.hide();
      this.acceptRideService.declineRide(reason);
    }
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }
}
