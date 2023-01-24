import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { DriverRideRequestComponent } from '../driver-ride-request/driver-ride-request.component';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit{

  currentRide = {
    startAddress: '123 Main St',
    endAddress: '456 Park Ave',
    price: '$20',
    duration: '30 minutes',
    distance: '5 miles',
  };

  @ViewChild('ride_details', {static: false}) rideDetails: ElementRef | undefined;
  @ViewChild('map_container', {static: false}) mapContainer: ElementRef | undefined;
  @ViewChild(DriverRideRequestComponent) modal: DriverRideRequestComponent | undefined;


  ngOnInit(): void {
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
