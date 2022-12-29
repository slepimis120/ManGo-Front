import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { CoordinateModel } from '../models/coordinate.model';
import { VehicleType } from '../models/vehicle.model';

const BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private subject!: Subject<any>;
  private observable$!: Observable<any>;
  private addressSubject : BehaviorSubject<any>;
  private address$!:Observable<any>;

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




  placeMarkerOne(map: any, address: string) : void{
    let url = `https://${BASE_NOMINATIM_URL}/search?format=json&q=${address}`;
    this.http.get(url).subscribe((res : any) =>{
      const lat = res[0].lat;
      const lon = res[0].lon;
      let coordinate = new CoordinateModel(lat, lon);
      this.sendData(coordinate);
    });
  }

  connectMarkers(map: any, coordinate1 :CoordinateModel, coordinate2 : CoordinateModel) : void {
    let routing = L.Routing.control({
      waypoints: [
        L.latLng(coordinate1.latitude, coordinate1.longitude),
        L.latLng(coordinate2.latitude, coordinate1.longitude)
      ]
    }).addTo(map)
    routing.on('routesfound', (e) => {
      let routes = e.routes;
      let summary = routes[0].summary;  
      let distance = summary.totalDistance / 1000;
      let price = distance * 120;
      let duration = Math.round(summary.totalTime % 3600 / 60);
      this.sendData([price, distance, duration]);})
  }

}


  


function sendData(arg0: number) {
  throw new Error('Function not implemented.');
}

