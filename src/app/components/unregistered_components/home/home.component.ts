import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import { MarkerService } from 'src/app/services/marker.service';
import * as L from 'leaflet';
import { MapComponent } from '../../map_components/map/map.component';
import { VehicleType } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  price! : number;
  distance! : number;
  duration! : number;


  constructor(private markerService : MarkerService) {
    this.listenToButtonClicks();
   }
  getAddresses(startLocation : string, endLocation : string) : void { 
    this.markerService.sendData(startLocation);
    this.markerService.sendData(endLocation);
    
  }

  listenToButtonClicks() {
    this.markerService.getData().subscribe((res) => {
      if(Array.isArray(res)){
        this.price = Math.round(res[0]);
        this.distance = Math.round(res[1] * 10) / 10;
        this.duration = Math.round(res[2]);
      }
    })}
  

  calculate_price(selected :any){
    let selectedType = selected as VehicleType;
    console.log(selectedType);
  }

  callLogin(){
    
  }


}
