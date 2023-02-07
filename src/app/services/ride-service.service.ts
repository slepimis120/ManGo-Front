import { Injectable } from '@angular/core';
import { currentLocationIcon, RideStep, VehicleType } from '../constants/constants';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Ride } from '../models/ride.model';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private subject!: Subject<any>;
  private observable$!: Observable<any>;


  constructor(private http: HttpClient) {
    this.subject = new Subject();
    this.observable$ = this.subject.asObservable();
   }




  sendData(data: any) {
    this.subject.next(data);
  }

  clearData() {
    this.subject.next(null);
  }

  getData(): Observable<any> {
    return this.observable$;
  }

getVehicleType(type : string) : VehicleType{
    switch (type.toUpperCase().trim()){
      case "STANDARD":
        return VehicleType.Standard;
      case "VAN":
        return VehicleType.Van;
      case "LUXURY":
        return VehicleType.Luxury;
      default:
        return VehicleType.Standard;
    }
  }

  simulateMovement(start: L.LatLng, end: L.LatLng, map: L.Map, locationMarker : L.Marker, indicator : boolean) {
    console.log(start, end);
    let route = L.Routing.control({
      waypoints: [
        L.latLng(start.lat, start.lng),
        L.latLng(end.lat, end.lng)
      ],
    })
    locationMarker.setLatLng(start);
    route.route();
    route.on('routesfound', (e) => {
      if (e.routes && e.routes[0]) {
        const route = e.routes[0];
        const routeCoordinates = route.coordinates.map((c: { lat: any; lng: any; }) => [c.lat, c.lng]);
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex === routeCoordinates.length - 1) {
            clearInterval(interval);
            if(indicator)
            this.sendData({"step" : RideStep.OnStartArrival});
            else
            this.sendData({"step": RideStep.OnEndArrival});
          } else {
            locationMarker.setLatLng(routeCoordinates[++currentIndex]);
          }
        }, 10);
      }
    }); 
  }
}
