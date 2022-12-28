import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import { MarkerService } from 'src/app/services/marker.service';
import * as L from 'leaflet';
import { MapComponent } from '../../map_components/map/map.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{



  constructor(private markerService : MarkerService) {
   }
  getAddresses(startLocation : string, endLocation : string) : void { 
    this.markerService.sendData(startLocation);
    this.markerService.sendData(endLocation);
  }
}
