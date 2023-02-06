import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { currentLocationIcon, invisibleIcon, MarkerStep, MarkerType, RideStep } from 'src/app/constants/constants';
import { CoordinateModel } from 'src/app/models/coordinate.model';
import { MapService } from 'src/app/services/map.service';
import { MarkerService } from 'src/app/services/marker.service';
import { RideService } from 'src/app/services/ride-service.service';

@Component({
  selector: 'app-driver-map',
  templateUrl: './driver-map.component.html',
  styleUrls: ['./driver-map.component.css']
})
export class DriverMapComponent {
  private map: any;
  private marker : any;
  private driverStartLocation: L.LatLng = new L.LatLng(0,0);
  private startMarker!: L.Marker<any>;
  private endMarker! : L.Marker<any>;
  private route! : L.Routing.Control;
  private currentLocationMarker! : L.Marker;
  
  getMap(){
    return this.map;
  }

  setMap(newMap : any){
    this.map = newMap;
  }

  constructor(private rideService: RideService, private http:HttpClient, private markerService : MarkerService) {
    this.getIncomingData();
  }

  getIncomingData() {
    this.markerService.getData().subscribe((res) => {
      switch(res["step"]){
        case MarkerStep.ConnectMarkers:
          this.connectMarkers();
          break;
        case MarkerStep.PlaceMarker:
          this.placeMarker(res);
          break;
        case MarkerStep.ReturnMarker:
          this.returnMarker(res);
          break;
        case MarkerStep.ReturnRoute:
          this.route = res["route"];
          break;
        case MarkerStep.SimulateMovement:
          let startCoordinate : L.LatLng;
          let endCoordinate : L.LatLng;
          let indicator : boolean;
          setTimeout(() => {
            if(res["type"] == "to-start"){
              startCoordinate = res["start"].getLatLng();
              endCoordinate = this.startMarker.getLatLng();
              indicator = true;
              this.currentLocationMarker = new L.Marker([startCoordinate.lat, startCoordinate.lng], {icon : currentLocationIcon}).addTo(this.map);
            }else{
              startCoordinate = this.startMarker.getLatLng();
              endCoordinate = this.endMarker.getLatLng()
              indicator = false;
            }
          
            this.rideService.simulateMovement(startCoordinate, endCoordinate, this.map, this.currentLocationMarker, indicator);
          }, 2000);
          break;
      }
    })
    this.rideService.getData().subscribe((res) => {
      switch(res["step"]){
        case RideStep.OnStartArrival:
          this.markerService.sendData({"step" : MarkerStep.SimulateMovement, "type" : "to-end"});
      }
    })
  }

  private connectMarkers(){
    this.removeRoute();
    this.createRoute();
  }

  private removeRoute(){
    if(this.route != undefined){
      this.route.remove();
    }
  }

  private placeMarker(res : any){
    this.removeRoute();
    if(res["start-address"]){
      if(this.startMarker != undefined){
        this.startMarker.removeFrom(this.map);
      }
      this.markerService.placeMarkerAddress(this.map, res["start-address"], MarkerType.StartLocation);
    }else if(res["end-address"]){
      if(this.endMarker != undefined){
        this.endMarker.removeFrom(this.map);
      }
      this.markerService.placeMarkerAddress(this.map, res["end-address"], MarkerType.EndLocation);
    }
  }

  private returnMarker(res : any){
    if(res["marker-type"] == MarkerType.StartLocation){
      this.startMarker = res["marker"];
      this.startMarker.bindPopup("Start Location").openPopup();
    }else if(res["marker-type"] == MarkerType.EndLocation){
      this.endMarker = res["marker"];
      this.endMarker.bindPopup("End Location").openPopup();
      this.connectMarkers();
    }
  }

  createRoute() : void {
    this.markerService.connectMarkers(this.map, this.startMarker.getLatLng(), this.endMarker.getLatLng());
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

  }


  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = invisibleIcon;
    this.initMap();
    this.markerService.placeCurrentLocation(this.map);
  }



}
