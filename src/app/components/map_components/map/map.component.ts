import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { MarkerService } from 'src/app/services/marker.service';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../model/vehicle';
import { CoordinateModel } from 'src/app/models/coordinate.model';
import { thisMonth } from '@igniteui/material-icons-extended';
import { VehicleType } from 'src/app/models/vehicle.model';
import { invisibleIcon, MarkerStep, MarkerType, startIcon } from 'src/app/constants/constants';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private startMarker!: L.Marker<any>;
  private endMarker! : L.Marker<any>;
  private route! : L.Routing.Control;
  price! : number;
  duration! : number;
  distance! : number;


  longitude! : number;
  latitude! : number;
  lastLayer: any;
  vehicles: Vehicle[] = [];
  carIcon: L.Icon;
  

  getMap(){
    return this.map;
  }

  setMap(newMap : any){
    this.map = newMap;
  }

  constructor(private mapService: MapService, private markerService: MarkerService, private http:HttpClient) {
    this.listenToButtonClicks();
    this.carIcon = L.icon({
      iconUrl: 'assets/images/icons/caricon.png',
      iconSize:     [38, 38],
      popupAnchor:  [-3, -76]
  });
  }

  listenToButtonClicks() {
    this.markerService.getData().subscribe((res) => {
      switch(res["step"]){
        case MarkerStep.ConnectMarkers:
          if(this.route != undefined){
            this.route.remove();
          }
          this.createRoute();
          break;
        case MarkerStep.PlaceMarker:

          if(this.route != undefined){
            this.route.remove();
          }
          if(res["start-address"]){
            if(this.endMarker != undefined){
              console.log(this.endMarker.getLatLng().lat, this.endMarker.getLatLng().lng);
            }
            if(this.startMarker != undefined){
              this.startMarker.removeFrom(this.map);
            }
            this.markerService.placeMarkerAddress(this.map, res["start-address"], MarkerType.StartLocation);
          }else if(res["end-address"]){
            if(this.endMarker != undefined){
              console.log(this.endMarker.getLatLng().lat, this.endMarker.getLatLng().lng);
            }
            if(this.endMarker != undefined){
              this.endMarker.removeFrom(this.map);
            }
            this.markerService.placeMarkerAddress(this.map, res["end-address"], MarkerType.EndLocation);
          }
          break;
        case MarkerStep.ReturnRideDetails:
          this.price = res["price"];
          this.duration = res["duration"];
          this.distance = res["distance"];
          break;
        case MarkerStep.ReturnMarker:
          if(res["marker-type"] == MarkerType.StartLocation){
            this.startMarker = res["marker"];
            if(this.endMarker != undefined){
              console.log(this.endMarker.getLatLng().lat, this.endMarker.getLatLng().lng);
            }
          }else if(res["marker-type"] == MarkerType.EndLocation){
            this.endMarker = res["marker"];
            if(this.endMarker != undefined){
              console.log(this.endMarker.getLatLng().lat, this.endMarker.getLatLng().lng);
            }
          }
          break;
        case MarkerStep.ReturnRoute:
          this.route = res["route"];
      }
    })
  }

  private initMap(): void {
    this.map = L.map('map', {
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
  }


  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
      });
      const mp = new L.Marker([lat, lng]).addTo(this.map);
      alert(mp.getLatLng());
    });
  }

  createRoute() : void {
    if(this.endMarker != undefined){
      console.log(this.endMarker.getLatLng().lat, this.endMarker.getLatLng().lng);
    }
    this.markerService.connectMarkers(this.map, this.startMarker.getLatLng(), this.endMarker.getLatLng());
    
  }


  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = invisibleIcon;
    this.initMap();
    this.getAllVehicles();
  }


  getAllVehicles(){
    let url = "http://localhost:8080/api/vehicle";
    this.http.get<Vehicle[]>(url).subscribe(
      res => {
        this.vehicles = res;
        this.addVehiclesToMap();
      },
      err => {
        alert("An Error has occured");
      }
    );
  }

  addVehiclesToMap(){
    for(let i=0; i<this.vehicles.length; i++){
      let marker = L.marker([this.vehicles[i].currentLocation.latitude, this.vehicles[i].currentLocation.longitude],{icon:this.carIcon}).addTo(this.map);
    }
  }
}
