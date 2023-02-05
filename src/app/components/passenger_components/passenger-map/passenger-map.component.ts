import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as L from 'leaflet';
import { currentLocationIcon, invisibleIcon, MarkerStep, MarkerType } from 'src/app/constants/constants';
import { MapService } from 'src/app/services/map.service';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-passenger-map',
  templateUrl: './passenger-map.component.html',
  styleUrls: ['./passenger-map.component.css']
})
export class PassengerMapComponent{
  private map: any;
  private startMarker!: L.Marker<any>;
  private endMarker! : L.Marker<any>;
  private route! : L.Routing.Control;

  constructor(private markerService : MarkerService) {
    this.getIncomingData();
  }
  getIncomingData() {
    this.markerService.getData().subscribe((res) => {
      switch(res["step"]){
        case MarkerStep.ConnectMarkers:
          this.connectMarkers();
          break;
        case MarkerStep.PlaceMarker:
          console.log("ulazi?");
          this.placeMarker(res);
          break;
        case MarkerStep.ReturnMarker:
          this.returnMarker(res);
          break;
        case MarkerStep.ReturnRoute:
          this.route = res["route"];
          break;
        case MarkerStep.SimulateMovement:
          setTimeout(() => {
            this.markerService.simulateMovement(this.startMarker.getLatLng(), this.endMarker.getLatLng(), this.map, this.route);
          }, 3000);
          break;
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
    this.map = L.map('map-passenger', {
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
    //this.markerService.followLocation(this.map);
  }


}
