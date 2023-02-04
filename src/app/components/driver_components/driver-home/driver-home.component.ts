import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { thisMonth } from '@igniteui/material-icons-extended';
import * as bootstrap from 'bootstrap';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { CoordinateModel } from 'src/app/models/coordinate.model';
import { AcceptRideService } from 'src/app/services/accept-ride.service';
import { MarkerService } from 'src/app/services/marker.service';
import { DriverRideRequestComponent } from '../driver-ride-request/driver-ride-request.component';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit{
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
  @ViewChild('map_container', {static: false}) mapContainer: ElementRef | undefined;
  @ViewChild(DriverRideRequestComponent) modal: DriverRideRequestComponent | undefined;


  constructor(private handleRideService: AcceptRideService, private markerService: MarkerService) { }

  ngOnInit(): void {
    this.acceptSubscription = this.handleRideService.rideAccepted$.subscribe(
      rideAccepted => {
        this.handleAccept()
      });
      this.declineSubscription = this.handleRideService.rideDeclined$.subscribe(
        rideDeclined => {
          this.handleDecline()
      });
      this.markerService.getData().subscribe((res) => {
        if(res['coordinate']){
         if(this.startCoordinate == undefined){
          this.startCoordinate = res['coordinate']
         } else{
          this.endCoordinate = res['coordinate']
          this.markerService.sendData({
            "startCoordinate" : this.startCoordinate,
           "endCoordinate" : this.endCoordinate} )
         }
        }
        if(res["finished-connecting"]){
          this.currentRide.price = res["price"];
          this.currentRide.distance = res["distance"];
          this.currentRide.duration = res["duration"];
          this.simulateMovement();
        }
      })
  }

  handleAccept(){
    if(this.rideDetails !=undefined){
      this.rideDetails.nativeElement.style.display = 'block';
    }   
    if(this.mapContainer != undefined){
      this.mapContainer.nativeElement.classList.add('col-8');
    }
    console.log("jedan")
    this.markerService.sendData({'driver-map': true,
                                 'start-address' : this.currentRide.startAddress,
                                  'end-address' : this.currentRide.endAddress});
  }

  handleDecline(){

  }


  simulateMovement(){
    if(this.startCoordinate != undefined){
      let startLocation = new L.LatLng(this.startCoordinate.latitude, this.startCoordinate.longitude);
      this.markerService.sendData({"simulate-current-location": true, "startLocation" : startLocation});
    }
  }

  
  ngAfterViewInit(): void {
    
    if(this.rideDetails !=undefined){
      this.rideDetails.nativeElement.style.display = 'none';
    }   
    if(this.mapContainer != undefined){
      this.mapContainer.nativeElement.classList.remove('col-8');
    }
    if(this.modal != undefined){
      this.modal.show();
    }
  }
}
