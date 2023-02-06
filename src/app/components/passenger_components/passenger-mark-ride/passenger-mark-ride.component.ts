import { Component } from '@angular/core';

@Component({
  selector: 'app-passenger-mark-ride',
  templateUrl: './passenger-mark-ride.component.html',
  styleUrls: ['./passenger-mark-ride.component.css']
})
export class PassengerMarkRideComponent {

  showModal: boolean = false;

  ratings1 = [
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false }
  ];

  ratings2 = [
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false }
  ];

  constructor() { }

  onStarHover(rate: { filled: boolean; }) {
    this.ratings1.forEach((r, index) => {
      if (index <= this.ratings1.indexOf(rate)) {
        r.filled = true;
      } else {
        r.filled = false;
      }
    });
  }

  onStarClick(rate: { filled: boolean; }) {
    this.ratings1.forEach((r) => {
      r.filled = false;
    });

    this.ratings1.forEach((r, index) => {
      if (index <= this.ratings1.indexOf(rate)) {
        r.filled = true;
      }
    });
  }






  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }
}
