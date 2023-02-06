import { Component, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { MarkerStep, RideStep, VehicleType } from 'src/app/constants/constants';
import { CoordinateModel } from 'src/app/models/coordinate.model';
import { AcceptRideService } from 'src/app/services/accept-ride.service';
import { MarkerService } from 'src/app/services/marker.service';
import { Ride } from 'src/app/models/ride.model';
import { Driver } from 'src/app/models/driver.model';
import { Passenger } from 'src/app/models/passenger.model';
import {Location } from "src/app/models/location.model";
import { PassengerMarkRideComponent } from '../passenger-mark-ride/passenger-mark-ride.component';
import { RideService } from 'src/app/services/ride-service.service';

@Component({
  selector: 'app-passenger-current-ride',
  templateUrl: './passenger-current-ride.component.html',
  styleUrls: ['./passenger-current-ride.component.css']
})
export class PassengerCurrentRideComponent {
  acceptSubscription: Subscription | undefined;
  declineSubscription: Subscription | undefined;
  startCoordinate : CoordinateModel | undefined = undefined;
  endCoordinate : CoordinateModel | undefined = undefined;
  currentRide : Ride;
  currentTime : number;
  currentDistance : number;

  @ViewChild('ride_details', {static: false}) rideDetails: ElementRef | undefined;
  @ViewChild(PassengerMarkRideComponent) modal: PassengerMarkRideComponent | undefined;



  constructor(private rideService : RideService, private markerService: MarkerService) {
    this.getIncomingData();
    let startLocation = new Location("Mise Dimitrijevica 34 Novi Sad", 0, 0);
    let endLocation = new Location("Jevrejska 8 Novi Sad", 0, 0);
    let driver = new Driver(0, "Aleksandar", "Mitrovic", "Neki url", "0600538922", "aleksa@gmail.com", "Stevana Mokranjca 92", "sifra", false);
    let passenger = new Passenger(0, "Svetlana", "Raznatovic", "neki url", "0613191670", "ceca@gmail.com", "Jevrejska 8", "sifrica", false);
    let scheduledTime = new Date();
    this.currentRide = new Ride(driver, [startLocation, endLocation], [passenger], VehicleType.Standard, true, true, scheduledTime, 190, 12, 1.3);
    this.currentTime = this.currentRide.duration;
    this.currentDistance = this.currentRide.distance;
    setInterval(() => {
      if(this.currentTime != 0){
        this.currentTime -= 1;
        if(this.currentDistance != 0){
          this.currentDistance -= this.currentDistance / this.currentTime;
        }
      }
    }, 60000);
  }

  getIncomingData(){
    this.rideService.getData().subscribe((res) => {
      if(res["step"] == RideStep.FinishRidePassenger){
        if(this.modal != undefined){
          this.modal.show();
        }
      }
    })
  }

  ngOnInit(): void {
    
  }  
  ngAfterViewInit(): void {
    this.markerService.sendData({
      "step" : MarkerStep.PlaceMarker,
      "start-address" : this.currentRide.locations[0].address});
    this.markerService.sendData({
      "step" : MarkerStep.PlaceMarker,
      "end-address" : this.currentRide.locations[1].address});
    this.markerService.sendData({
      "step" : MarkerStep.SimulateMovement})
      
  }
  
}
