import { Component, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { MarkerStep } from 'src/app/constants/constants';
import { CoordinateModel } from 'src/app/models/coordinate.model';
import { AcceptRideService } from 'src/app/services/accept-ride.service';
import { MarkerService } from 'src/app/services/marker.service';
import { DriverRideRequestComponent } from '../../driver_components/driver-ride-request/driver-ride-request.component';

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

  currentRide = {
    startAddress: 'Mise Dimitrijevica 43 Novi Sad',
    endAddress: 'Futoska 30 Novi Sad',
    price: '20',
    duration: '30',
    distance: '5',
  };

  @ViewChild('ride_details', {static: false}) rideDetails: ElementRef | undefined;


  constructor(private handleRideService: AcceptRideService, private markerService: MarkerService) { }

  ngOnInit(): void {
    
  }  
  ngAfterViewInit(): void {
    this.markerService.sendData({
      "step" : MarkerStep.PlaceMarker,
      "start-address" : this.currentRide.startAddress});
    this.markerService.sendData({
      "step" : MarkerStep.PlaceMarker,
      "end-address" : this.currentRide.endAddress});
  }
}
