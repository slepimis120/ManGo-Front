import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CoordinateModel } from 'src/app/models/coordinate.model';
import { MapService } from 'src/app/services/map.service';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-driver-map',
  templateUrl: './driver-map.component.html',
  styleUrls: ['./driver-map.component.css']
})
export class DriverMapComponent implements OnInit{
  private map: any;
  private marker : any;
  private driverStartLocation: L.LatLng = new L.LatLng(0,0);
  
  getMap(){
    return this.map;
  }

  setMap(newMap : any){
    this.map = newMap;
  }

  constructor(private mapService: MapService, private http:HttpClient, private markerService : MarkerService) {
    
  }

  ngOnInit(): void {
    this.markerService.getData().subscribe((res) => {
      if(res['driver-map']){
        //this.markerService.placeMarkerOne(this.map, res['start-address']);
        //this.markerService.placeMarkerOne(this.map, res['end-address']);
      }
      if(res['startCoordinate']){
        this.markerService.connectMarkers(this.map, res['startCoordinate'], res['endCoordinate']);
      }
      if(res['simulate-current-location']){
        console.log("Slusaj sad ovamo: " + this.driverStartLocation + res['startLocation']);
        this.markerService.simulateMovement(this.driverStartLocation, res['startLocation'], this.map);
      }
    })
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
    this.getCurrentLocation();
    this.getCurrentLocation().then(driverStartLocation => {
      this.driverStartLocation = driverStartLocation;
      this.setCurrentLocation(this.driverStartLocation);
    });
  }

  getCurrentLocation(): Promise<L.LatLng> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const driverStartLocation = new L.LatLng(latitude, longitude)
        resolve(driverStartLocation);
      });
    });
  }

  setCurrentLocation(coordinates : L.LatLng){
    let currentLocation = L.icon({
      iconUrl: '../../../../assets/images/current_location_marker.png',
      iconSize:     [40, 40],
    });
    this.map.setView([coordinates.lat, coordinates.lng], 13);
    this.marker = L.marker([coordinates.lat, coordinates.lng],{icon: currentLocation}).addTo(this.map);  
    this.marker.bindPopup("This is your current location").openPopup();
  }

  followLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let currentLocation = L.icon({
          iconUrl: '../../../../assets/images/current_location_marker.png',
          iconSize:     [40, 40],
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

  simulateMovement(startLocation : L.LatLng, endLocation : L.LatLng){
    this.markerService.simulateMovement(startLocation, endLocation, this.map);
  } 

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }



}
