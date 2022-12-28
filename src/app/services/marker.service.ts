import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Observable, Subject } from 'rxjs';

const BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
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

  placeMarkerOne(map: any, address: string) : void{
    let url = `https://${BASE_NOMINATIM_URL}/search?format=json&q=${address}`;
    this.http.get(url).subscribe((res : any) =>{
      const lon = res[0].lat;
      const lat = res[0].lon;
      let marker = L.marker([lon, lat]).addTo(map);
    });
  }
}

  


