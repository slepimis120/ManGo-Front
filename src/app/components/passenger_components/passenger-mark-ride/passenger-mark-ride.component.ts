import { Component } from '@angular/core';

@Component({
  selector: 'app-passenger-mark-ride',
  templateUrl: './passenger-mark-ride.component.html',
  styleUrls: ['./passenger-mark-ride.component.css']
})
export class PassengerMarkRideComponent {

  showModal: boolean = false;
  rideStars = [1, 2, 3, 4, 5];
  driverStars = [1, 2, 3, 4, 5];
  rideFilled = 0;
  driverFilled = 0;
  rideHovered = 0;
  driverHovered = 0;

  constructor() { }

  fillStars(index: number, type: string) {
    if (type === 'ride') {
      this.rideFilled = index + 1;
    } else {
      this.driverFilled = index + 1;
    }
  }

  onStarHover(index: number, type: string) {
    if (type === 'ride') {
      this.rideHovered = index + 1;
    } else {
      this.driverHovered = index + 1;
    }
  }

  onStarLeave(type: string) {
    if (type === 'ride') {
      this.rideHovered = 0;
    } else {
      this.driverHovered = 0;
    }
  }




  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }
}
