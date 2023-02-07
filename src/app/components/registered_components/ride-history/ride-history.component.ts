import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehicleType } from 'src/app/constants/constants';
import { Driver } from 'src/app/models/driver.model';
import { Passenger } from 'src/app/models/passenger.model';
import { Ride } from 'src/app/models/ride.model';
import { MarkerService } from 'src/app/services/marker.service';
import { RideService } from 'src/app/services/ride-service.service';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent {
  isChecked = false;

  rideHistory : Ride[] = [];

  toggleChecked() {
    this.isChecked = !this.isChecked;
  }
  
  currentRide : Ride;

  constructor(private rideService : RideService, private markerService: MarkerService) {
    let startLocation = new Location("Mise Dimitrijevica 34 Novi Sad", 0, 0);
    let endLocation = new Location("Jevrejska 8 Novi Sad", 0, 0);
    let driver = new Driver(0, "Aleksandar", "Mitrovic", "Neki url", "0600538922", "aleksa@gmail.com", "Stevana Mokranjca 92", "sifra", false);
    let passenger = new Passenger(0, "Svetlana", "Raznatovic", "neki url", "0613191670", "ceca@gmail.com", "Jevrejska 8", "sifrica", false);
    let scheduledTime = new Date();
    this.currentRide = new Ride(driver, [startLocation, endLocation], [passenger], VehicleType.Standard, true, true, scheduledTime, 190, 12, 1.3);
    this.rideHistory.push(this.currentRide);
    startLocation = new Location("Bulevar Oslobodjenja 13 Novi Sad", 0, 0);
    endLocation = new Location("Bulevar Oslobodjenja 123 Novi Sad", 0, 0);
    driver = new Driver(0, "Dusan", "Vlahovic", "Neki url2", "060258922", "dusan@gmail.com", "Borova 23", "sifra", false);
    scheduledTime = new Date();
    this.currentRide = new Ride(driver, [startLocation, endLocation], [passenger], VehicleType.Standard, true, true, scheduledTime, 400, 20, 3.1);
    this.rideHistory.push(this.currentRide);
  }

  toggleRide(i : number){
    this.currentRide = this.rideHistory[i];
  }
}
