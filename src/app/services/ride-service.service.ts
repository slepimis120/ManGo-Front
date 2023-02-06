import { Injectable } from '@angular/core';
import { currentLocationIcon, RideStep, VehicleType } from '../constants/constants';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private subject!: Subject<any>;
  private observable$!: Observable<any>;
  private addressSubject : BehaviorSubject<any>;
  private address$!:Observable<any>;
  private currentLocation : L.Marker | undefined;

  constructor(private http: HttpClient) {
    this.subject = new Subject();
    this.observable$ = this.subject.asObservable();
    this.addressSubject = new BehaviorSubject<any>(null);
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

  simulateMovement(start: L.LatLng, end: L.LatLng, map: L.Map, route : L.Routing.Control, locationMarker : L.Marker) {
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
            this.sendData({"step" : RideStep.FinishRidePassenger})
          } else {
            locationMarker.setLatLng(routeCoordinates[++currentIndex]);
          }
        }, 10);
      }
    }); 
  }
}
