import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MarkerService } from 'src/app/services/marker.service';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../../../models/vehicle';
import { invisibleIcon, MarkerStep, MarkerType, startIcon } from 'src/app/constants/constants';
import { RideService } from 'src/app/services/ride-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './unregistered_map.component.html',
  styleUrls: ['./unregistered_map.component.css'],
})
export class UnregisteredMapComponent implements AfterViewInit {
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
  vehicle! : L.Marker;
  

  getMap(){
    return this.map;
  }

  setMap(newMap : any){
    this.map = newMap;
  }

  constructor( private markerService: MarkerService, private http:HttpClient, private rideService : RideService) {
    this.getIncomingData();
    this.carIcon = L.icon({
      iconUrl: 'assets/images/icons/caricon.png',
      iconSize:     [38, 38],
      popupAnchor:  [-3, -76]
  });
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
        case MarkerStep.TargetLocation:
          if(res["point"] == "start"){
            this.registerOnClick(MarkerType.StartLocation);
          }
          if(res["point"] == "end"){
            this.registerOnClick(MarkerType.EndLocation);
          }
          break;
        case MarkerStep.CheckMarkers:
          setTimeout(() => {
            if(this.startMarker == undefined || this.endMarker == undefined){
              this.markerService.sendData({"step" : MarkerStep.CheckedMarkers, "placed" : false});
            }else{
              this.markerService.sendData({"step" : MarkerStep.CheckedMarkers, "placed" : true});
            }
          }, 1000);
          break;
          case MarkerStep.SimulateVehicleMovement:
            this.rideService.simulateMovement(this.vehicle.getLatLng(), this.startMarker.getLatLng(), this.map, this.vehicle, true)
            break;
          case MarkerStep.GetMarkers:
            this.markerService.sendData({"step" : MarkerStep.SendMarkers, "start" : this.startMarker, "end" : this.endMarker});
      }
    })
  }

  private connectMarkers(){
    setTimeout(() => {
      this.removeRoute();
      this.createRoute();
    }, 1000);
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
    }else if(res["marker-type"] == MarkerType.EndLocation){
      this.endMarker = res["marker"];
    }
  }

  private initMap(): void {
    if (this.map != undefined) this.map = this.map.remove();
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


  registerOnClick(markerType : MarkerType): void {
      let clickEvent = this.map.on('click', (e: any) => {
          this.removeRoute();
          console.log(markerType);
          if(markerType == MarkerType.StartLocation){
            if(this.startMarker != undefined){
              this.startMarker.removeFrom(this.map);
            }
          }
          if(markerType == MarkerType.EndLocation){
            if(this.endMarker != undefined){
              this.endMarker.removeFrom(this.map);
            }
          }
          const coordinates = e.latlng;
          this.markerService.placeMarkerCoordinate(this.map, coordinates, markerType);
          this.map.off('click');
      });
  }
  

  createRoute() : void {
    this.markerService.connectMarkers(this.map, this.startMarker.getLatLng(), this.endMarker.getLatLng());
  }


  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = invisibleIcon;
    this.initMap();
    this.getAllVehicles();
    this.markerService.followLocation(this.map);
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
      if(i == 0){
        this.vehicle = marker;
      }
    }
  }
}
