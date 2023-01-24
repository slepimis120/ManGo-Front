import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../map_components/map.service';

@Component({
  selector: 'app-driver-map',
  templateUrl: './driver-map.component.html',
  styleUrls: ['./driver-map.component.css']
})
export class DriverMapComponent {
  private map: any;
  private marker : any;
  
  getMap(){
    return this.map;
  }

  setMap(newMap : any){
    this.map = newMap;
  }

  constructor(private mapService: MapService, private http:HttpClient) {
  }

 
  private initMap(): void {
    this.map = L.map('map-driver', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);




    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let currentLocation = L.icon({
          iconUrl: '../../../../assets/images/current_location_marker.png',
          iconSize:     [40, 40], // size of the icon
        });
        this.map.setView([position.coords.latitude, position.coords.longitude], 13);
        this.marker = L.marker([position.coords.latitude, position.coords.longitude],{icon: currentLocation}).addTo(this.map);  
        this.marker.bindPopup("This is your current location").openPopup();
      });

      navigator.geolocation.watchPosition(position => {
        this.map.setView([position.coords.latitude, position.coords.longitude], 13);
        this.marker.setLatLng([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }



}
